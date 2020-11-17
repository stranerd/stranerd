import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { isServer } from '@utils/environment'
import Cookie from 'cookie'
import { TOKEN_SESSION_NAME, USER_SESSION_NAME } from '@utils/constants'

export default defineNuxtPlugin(({ req }) => {
	const cookies = isServer() ? Cookie.parse(req.headers.cookie ?? '') : {}
	const { [USER_SESSION_NAME]: userJSON, [TOKEN_SESSION_NAME]: session } = cookies
	if (session && userJSON) useAuth().setAuthDetails(JSON.parse(userJSON))
})
