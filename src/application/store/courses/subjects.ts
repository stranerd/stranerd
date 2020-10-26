import { SubjectEntity } from '@modules/courses/domain/entities/subject'
import { Mutation } from 'vuex'

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

export const mutations = {
	setLoading: (state, loading) => state.loading = loading,
	setFetched: (state, fetched) => state.fetched = fetched,
	setError: (state, error) => state.error = error,
	setSubjects: (state, subjects) => state.subjects = subjects
} as { [key: string]: Mutation<S> }
