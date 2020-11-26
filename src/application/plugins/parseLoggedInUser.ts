import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { isServer } from '@utils/environment'
import Cookie from 'cookie'
import { TOKEN_SESSION_NAME, USER_SESSION_NAME } from '@utils/constants'
import { FindUser } from '@modules/users'

export default defineNuxtPlugin(async ({ req }) => {
	const cookies = isServer() ? Cookie.parse(req.headers.cookie ?? '') : {}
	const { [USER_SESSION_NAME]: userJSON, [TOKEN_SESSION_NAME]: session } = cookies
	if (session && userJSON) {
		const authDetails = JSON.parse(userJSON)
		const user = await FindUser.call(authDetails.id)
		useAuth().setAuthDetails(authDetails)
		useAuth().setUser(user)
	}
})
