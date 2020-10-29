import { reactive, toRefs } from '@nuxtjs/composition-api'
import { GetPasswordResetFactory, ResetPassword } from '@modules/auth'
import { useErrorHandler } from '@app/usecases/core/states'

export const usePasswordReset = () => {
	const state = reactive({
		loading: false,
		message: '',
		factory: GetPasswordResetFactory.call()
	})
	const { error, setError } = useErrorHandler()
	const resetPassword = async () => {
		setError('')
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				await ResetPassword.call(state.factory)
				state.factory.reset()
				state.message = 'Proceed to your registered email to continue'
			} catch (error) { setError(error) }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), error, resetPassword }
}
