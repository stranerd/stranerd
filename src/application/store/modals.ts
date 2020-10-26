import { Mutation } from 'vuex'

type S = {
	createModal: string | null
}

export const state = () :S => ({
	createModal: null
})

export const mutations = {
	setCreateModal: (state, mode) => state.createModal = mode
} as { [key: string]: Mutation<S> }
