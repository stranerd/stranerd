import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import Cookie from 'cookie'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, USER_SESSION_NAME } from '@utils/constants'
import { saveTokens } from '@utils/tokens'
import { AuthDetails } from '@modules/auth/domain/entities/auth'

export default defineNuxtPlugin(async ({ req, redirect }) => {
	const cookies = Cookie.parse(req.headers.cookie ?? '')
	const {
		[USER_SESSION_NAME]: userJSON = null,
		[ACCESS_TOKEN_NAME]: accessToken = null,
		[REFRESH_TOKEN_NAME]: refreshToken = null
	} = cookies
	await saveTokens({ accessToken, refreshToken })
	await useAuth().setTokens({ accessToken, refreshToken })
	if (userJSON) {
		const user = JSON.parse(userJSON) as AuthDetails
		await useAuth().setAuthUser(user)
		if (!user.isVerified) await redirect('/auth/verify')
	}
})
