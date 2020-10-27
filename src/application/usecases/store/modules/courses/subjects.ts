import { useContext, computed } from '@nuxtjs/composition-api'
import { SubjectEntity } from '@modules/courses/domain/entities/subject'

export const Subjects = (store = useContext().store) => {
	const state = store.state.courses.subjects

	return {
		loading: computed(() => state.loading as boolean),
		fetched: computed(() => state.fetched as boolean),
		error: computed(() => state.error as string),
		subjects: computed(() => state.subjects as SubjectEntity[]),

		setLoading: (loading: boolean) => store.commit('courses/subjects/setLoading', loading),
		setFetched: (fetched: boolean) => store.commit('courses/subjects/setFetched', fetched),
		setError: (error: string) => store.commit('courses/subjects/setError', error),
		setSubjects: (subjects: SubjectEntity[]) => store.commit('courses/subjects/setSubjects', subjects),
		unshiftSubject: (subject: SubjectEntity) => store.commit('courses/subjects/unshiftSubject', subject)
	}
}
