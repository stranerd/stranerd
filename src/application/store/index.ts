import { Context } from '@nuxt/types'
import Cookie from 'cookie'
import { USER_SESSION_NAME, TOKEN_SESSION_NAME } from '@utils/constants'
import { isServer } from '@utils/environment'
import { Action } from 'vuex'

export const actions = {
	nuxtServerInit: async (ctx, { req }: Context) => {
		const cookies = isServer() ? Cookie.parse(req.headers.cookie ?? '') : {}
		const { [USER_SESSION_NAME]: userJSON, [TOKEN_SESSION_NAME]: session } = cookies
		if (session && userJSON) await ctx.dispatch('auth/setAuthDetails', JSON.parse(userJSON))
	}
} as { [key: string]: Action<any, any> }
