import { SendVerificationEmail, SessionSignin } from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { isClient, isServer } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import VueRouter from 'vue-router'
import { useAuth } from '@app/hooks/auth/auth'
import { Alert } from '@app/hooks/core/notifications'
import { serialize } from '@utils/cookie'

export const createSession = async (user: AfterAuthUser, router: VueRouter) => {
	const authDetails = await SessionSignin.call(user.idToken)
	const { setAuthUser, signin } = useAuth()
	const isVerified = await setAuthUser(authDetails, router)
	if (!isVerified) return
	await signin(false, router)

	const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document.cookie ?? '')
	document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', { expires: new Date(0) })
	await router.push(redirect ?? '/dashboard')
}

export const useSessionSignout = () => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to sign out?',
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, signout'
		})
		if (accepted) {
			setLoading(true)
			try {
				await useAuth().signout(router)
			} catch (error) {
				setError(error)
			}
			setLoading(false)
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

export const useVerifyEmail = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const verifyEmail = async () => {
		const email = useAuth().auth.value?.email
		if (!email) return
		setError('')
		setLoading(true)
		try {
			const redirectUrl = (isClient() ? window.location.origin : '') + '/auth/signin'
			await SendVerificationEmail.call(email, redirectUrl)
			setMessage(`A verification email was just sent to ${email}. Proceed to your email to complete your verification.`)
		} catch (error) {
			setError(error)
		}
		setLoading(false)
	}

	return {
		email: useAuth().auth.value?.email,
		loading, error, message,
		verifyEmail
	}
}
