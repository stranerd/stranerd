import { reactive, reqRef, toRefs, useFetch } from '@nuxtjs/composition-api'
import { GetSubjects, AddSubject, GetSubjectFactory, FindSubject } from '@modules/posts'
import { useCreateModal } from '@app/usecases/core/modals'
import { Notify } from '@app/usecases/core/notifications'
import { SubjectEntity } from '@modules/posts/domain/entities/subject'
import { useErrorHandler } from '@app/usecases/core/states'

const global = {
	loading: reqRef(false),
	fetched: reqRef(false),
	subjects: reqRef([] as SubjectEntity[])
}
const { error, setError: setGlobalError } = useErrorHandler()

export const useSubjectList = () => {
	const fetchSubjects = async () => {
		setGlobalError('')
		if (!global.fetched.value) {
			global.loading.value = true
			try {
				global.subjects.value = await GetSubjects.call()
				global.fetched.value = true
			} catch (error) { setGlobalError(error) }
			global.loading.value = false
		}
	}
	useFetch(fetchSubjects)

	return { ...global, error }
}

const fetchSubject = async (id: string) => {
	let subject = global.subjects.value.find((subject) => subject.id === id)
	if (subject) return subject
	subject = await FindSubject.call(id) ?? undefined
	if (subject) global.subjects.value.unshift(subject)
	return subject
}

export const useCreateSubject = () => {
	const state = reactive({
		loading: false,
		error: '',
		factory: GetSubjectFactory.call()
	})
	const { error, setError } = useErrorHandler()

	const createSubject = async () => {
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const id = await AddSubject.call(state.factory)
				await fetchSubject(id)
				state.factory.reset()
				useCreateModal().closeCreateModal()
				await Notify({
					title: 'Subject created successfully',
					icon: 'success'
				})
			} catch (error) { setError(error) }
			state.loading = false
		} else state.factory.validateAll()
	}

	return { ...toRefs(state), error, createSubject }
}
