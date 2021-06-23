import { SessionSignin, SendVerificationEmail } from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { isServer } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { useContext, reqRef } from '@nuxtjs/composition-api'
import VueRouter from 'vue-router'
import { useAuth } from '@app/hooks/auth/auth'
import { Alert } from '@app/hooks/core/notifications'
import { serialize } from '@utils/cookie'

export const createSession = async (user: AfterAuthUser, router: VueRouter) => {
	const authDetails = await SessionSignin.call(user.idToken)
	const { setAuthUser, signin } = useAuth()
	await setAuthUser(authDetails)
	const wasVerified = await signin(false)
	if (!wasVerified) {
		global.email.value = authDetails.email
		await router.push('/auth/verify')
		return
	}

	const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document.cookie ?? '')
	document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', { expires: new Date(0) })
	await router.push(redirect ?? '/dashboard')
}

export const useSessionSignout = () => {
	const { error, setError } = useErrorHandler()
	const { loading /*, setLoading */ } = useLoadingHandler()
	const signout = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to sign out?',
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, signout'
		})
		if (accepted) {
			// setLoading(true)
			try {
				await useAuth().signout()
			} catch (error) { setError(error) }
			// setLoading(false)
		}
	}

	return { loading, error, signout }
}

export const useRedirectToAuth = () => {
	const { app, res, route } = useContext()

	const redirect = () => {
		if (isServer()) res.setHeader('Set-Cookie', serialize(REDIRECT_SESSION_NAME, route.value.fullPath))
		else document.cookie = serialize(REDIRECT_SESSION_NAME, route.value.fullPath)
		if (app.router) app.router.push('/auth/signin')
	}

	return { redirect }
}

const global = {
	email: reqRef('')
}

export const useVerifyEmail = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const verifyEmail = async () => {
		if (!global.email.value) return
		const email = global.email.value
		setError('')
		setLoading(true)
		try {
			await SendVerificationEmail.call()
			setMessage(`A verification email was just sent to ${email}. Proceed to your email to complete your verification.`)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return {
		email: global.email,
		loading, error, message,
		verifyEmail
	}
}
