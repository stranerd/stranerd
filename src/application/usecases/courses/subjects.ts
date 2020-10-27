import { reactive, toRefs, useContext, useAsync } from '@nuxtjs/composition-api'
import { GetSubjects, AddSubject, GetSubjectFactory, FindSubject } from '@modules/courses'
import { useCreateModal } from '@app/usecases/core/modals'
import { SubjectEntity } from '@modules/courses/domain/entities/subject'

export const useSubjectList = () => {
	const store = useContext().store
	const state = reactive(store.state.courses.subjects)

	const fetchSubjects = async () => {
		store.commit('courses/subjects/setError', '')
		if (!state.fetched) {
			store.commit('courses/subjects/setLoading', true)
			try {
				store.commit('courses/subjects/setSubjects', await GetSubjects.call())
				store.commit('courses/subjects/setFetched', true)
			} catch (error) { store.commit('courses/subjects/setError', error) }
			store.commit('courses/subjects/setLoading', false)
		}
	}
	useAsync(fetchSubjects)

	return { ...toRefs(state) }
}

const fetchSubject = async (id: string) => {
	const store = useContext().store
	const state = reactive(store.state.courses.subjects)

	let subject = state.subjects.find((subject: SubjectEntity) => subject.id === id)
	if (subject) return subject
	subject = await FindSubject.call(id)
	if (subject) store.commit('courses/subjects/unshiftSubjects', subject)
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
