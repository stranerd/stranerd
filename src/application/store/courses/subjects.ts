import { SubjectEntity } from '@modules/courses/domain/entities/subject'
import { MutationTree } from 'vuex'

type S = {
	loading: boolean
	fetched: boolean
	error: string
	subjects: SubjectEntity[]
}

export const state = () :S => ({
	loading: false,
	fetched: false,
	error: '',
	subjects: []
})

export const mutations: MutationTree<S> = {
	setLoading: (state, loading: boolean) => state.loading = loading,
	setFetched: (state, fetched: boolean) => state.fetched = fetched,
	setError: (state, error: string) => state.error = error,
	setSubjects: (state, subjects: SubjectEntity[]) => state.subjects = subjects,
	unshiftSubjects: (state, subject: SubjectEntity) => state.subjects.unshift(subject)
}
