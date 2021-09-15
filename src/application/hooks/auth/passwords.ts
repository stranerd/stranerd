import { Ref, ref } from '@nuxtjs/composition-api'
import { PasswordResetFactory, SendPasswordResetEmail } from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'

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
				await SendPasswordResetEmail.call(factory.value)
				factory.value.reset()
				setMessage('Proceed to your email to continue')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, message, error, resetPassword }
}
