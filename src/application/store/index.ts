import { Context } from '@nuxt/types'
import Cookie from 'cookie'
import { USER_SESSION_NAME, TOKEN_SESSION_NAME } from '@utils/constants'
import { isServer } from '@utils/environment'
import { ActionTree } from 'vuex'
import { useAuth } from '@app/usecases/auth/auth'

export const actions: ActionTree<{}, any> = {
	nuxtServerInit: async (_, { req }: Context) => {
		const cookies = isServer() ? Cookie.parse(req.headers.cookie ?? '') : {}
		const { [USER_SESSION_NAME]: userJSON, [TOKEN_SESSION_NAME]: session } = cookies
		if (session && userJSON) await useAuth().setAuthDetails(JSON.parse(userJSON))
	}
}
