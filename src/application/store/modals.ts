import { MutationTree } from 'vuex'

type S = {
	createModal: string | null
}

export const state = () :S => ({
	createModal: null
})

export const mutations: MutationTree<S> = {
	setCreateModal: (state, mode: string) => state.createModal = mode
}
