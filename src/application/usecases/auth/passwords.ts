import { reactive, toRefs } from '@nuxtjs/composition-api'
import { GetResetPasswordFactory, ResetPassword } from '@modules/auth'

export const usePasswordReset = () => {
	const state = reactive({
		loading: false,
		message: '',
		error: '',
		factory: GetResetPasswordFactory.call()
	})
	const resetPassword = async () => {
		state.error = ''
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				await ResetPassword.call(state.factory)
				state.factory.reset()
				state.message = 'Proceed to your registered email to continue'
			} catch (error) { state.error = error }
			state.loading = false
		} else state.factory.validateAll()
	}
	return { ...toRefs(state), resetPassword }
}
