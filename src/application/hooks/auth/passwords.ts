import { Ref, ref } from '@nuxtjs/composition-api'
import { PasswordResetFactory, ResetPassword } from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { isClient } from '@utils/environment'

export const usePasswordReset = () => {
	const factory = ref(new PasswordResetFactory()) as Ref<PasswordResetFactory>
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const resetPassword = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const redirectUrl = (isClient() ? window.location.origin : '') + '/auth/signin'
				await ResetPassword.call(factory.value, redirectUrl)
				factory.value.reset()
				setMessage('Proceed to your email to continue')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, message, error, resetPassword }
}
