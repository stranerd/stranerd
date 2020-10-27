import { reactive, toRefs, useAsync } from '@nuxtjs/composition-api'
import { GetSubjects, AddSubject, GetSubjectFactory, FindSubject } from '@modules/courses'
import { useStore } from '@app/usecases/store'
import { useCreateModal } from '@app/usecases/core/modals'

export const useSubjectList = () => {
	const store = useStore().courses.subjects()
	const { loading, fetched, error, subjects } = store

	const fetchSubjects = async () => {
		store.setError('')
		if (!fetched.value) {
			store.setLoading(true)
			try {
				store.setSubjects(await GetSubjects.call())
				store.setFetched(true)
			} catch (error) { store.setError(error) }
			store.setLoading(false)
		}
	}
	useAsync(fetchSubjects)

	return { loading, error, subjects }
}

const fetchSubject = async (id: string) => {
	const store = useStore().courses.subjects()

	let subject = store.subjects.value
		.find((subject) => subject.id === id)
	if (subject) return subject
	subject = await FindSubject.call(id) ?? undefined
	if (subject) store.unshiftSubject(subject)
	return subject
}

export const useCreateSubject = () => {
	const state = reactive({
		loading: false,
		error: '',
		factory: GetSubjectFactory.call()
	})

	const createSubject = async () => {
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				const id = await AddSubject.call(state.factory)
				await fetchSubject(id)
				state.factory.reset()
				useCreateModal().closeCreateModal()
			} catch (error) { state.error = error }
			state.loading = false
		} else state.factory.validateAll()
	}

	return { ...toRefs(state), createSubject }
}
