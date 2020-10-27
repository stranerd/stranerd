import { Context } from '@nuxt/types'
import Cookie from 'cookie'
import { USER_SESSION_NAME, TOKEN_SESSION_NAME } from '@utils/constants'
import { isServer } from '@utils/environment'
import { ActionTree } from 'vuex'

export const actions: ActionTree<{}, any> = {
	nuxtServerInit: async (ctx, { req }: Context) => {
		const cookies = isServer() ? Cookie.parse(req.headers.cookie ?? '') : {}
		const { [USER_SESSION_NAME]: userJSON, [TOKEN_SESSION_NAME]: session } = cookies
		if (session && userJSON) await ctx.commit('auth/setAuthDetails', JSON.parse(userJSON))
	}
}
