import { reactive, toRefs, useContext, useAsync } from '@nuxtjs/composition-api'
import { GetSubjects } from '@modules/courses'

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

export const useCreateSubject = () => {}
