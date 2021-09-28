import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@utils/constants'
import { parseCookie } from '@utils/cookie'
import { GetAuthUser } from '@modules/auth'
import { saveTokens } from '@utils/tokens'

export default defineNuxtPlugin(async ({ req, redirect }) => {
	const cookies = parseCookie(req.headers.cookie ?? '')
	const {
		[ACCESS_TOKEN_NAME]: accessToken = null,
		[REFRESH_TOKEN_NAME]: refreshToken = null
	} = cookies
	if (accessToken && refreshToken) {
		await saveTokens({ accessToken, refreshToken })
		const user = await GetAuthUser.call().catch(() => null)
		if (user) {
			await useAuth().setAuthUser(user)
			if (user && !user.isVerified) await redirect('/auth/verify')
		} else {
			await saveTokens({ accessToken: null, refreshToken: null })
		}
	}
})
