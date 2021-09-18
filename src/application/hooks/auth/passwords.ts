import { Ref, ref, useRouter } from '@nuxtjs/composition-api'
import { PasswordResetFactory, PasswordResetRequestFactory, ResetPassword, SendPasswordResetEmail } from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { createSession } from '@app/hooks/auth/session'
import { NetworkError, StatusCodes } from '@modules/core'

export const usePasswordResetRequest = () => {
	const factory = ref(new PasswordResetRequestFactory()) as Ref<PasswordResetRequestFactory>
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const sendResetEmail = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				await SendPasswordResetEmail.call(factory.value)
				factory.value.reset()
				setMessage('Proceed to your email to continue')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, message, error, sendResetEmail }
}

export const usePasswordReset = (token: string) => {
	const router = useRouter()
	const factory = ref(new PasswordResetFactory()) as Ref<PasswordResetFactory>
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const resetPassword = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const user = await ResetPassword.call(token, factory.value)
				setMessage('Password reset successfully!')
				await createSession(user, router)
			} catch (error) {
				if (error instanceof NetworkError && error.statusCode === StatusCodes.InvalidToken) {
					setError('Invalid or expired token. Request a new link sent to your email')
					await router.replace('/auth/forgot')
				} else setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, message, error, resetPassword }
}
