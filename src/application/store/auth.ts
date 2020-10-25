import { Getter, Mutation, Action } from 'vuex'

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

export const getters = {
	isLoggedIn: (state) => !!state.auth?.id,
	getToken: (state) => state.auth?.token
} as { [key: string]: Getter<S, any> }

export const mutations = {
	setAuthDetails: (state, user) => state.auth = user
} as { [key: string]: Mutation<S> }

export const actions = {
	setAuthDetails: async (ctx, details: Auth) => ctx.commit('setAuthDetails', details)
} as { [key: string]: Action<S, any> }
