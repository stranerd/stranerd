import { GetterTree, MutationTree } from 'vuex'

type Auth = {
	id: string,
	email: string | null,
	verified: boolean,
	provider: string
	token: string
}

type S = {
	auth: Auth | null
}

export const state = () :S => ({
	auth: null
})

export const getters :GetterTree<S, any> = {
	isLoggedIn: (state) => !!state.auth?.id,
	getToken: (state) => state.auth?.token
}

export const mutations :MutationTree<S> = {
	setAuthDetails: (state, user: Auth) => state.auth = user
}
