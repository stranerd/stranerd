import { Getter, Mutation, Action } from 'vuex'

type S = {
	id: string | null
}

export const state = () :S => ({
	id: null
})

export const getters = {
	isLoggedIn: (state) => !!state.id
} as { [key: string]: Getter<S, any> }

export const mutations = {
	setId: (state, id) => state.id = id
} as { [key: string]: Mutation<S> }

export const actions = {
	setId: async (ctx, id: string) => ctx.commit('setId', id)
} as { [key: string]: Action<S, any> }
