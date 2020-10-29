import { reactive, toRefs } from '@nuxtjs/composition-api'
import { SessionSignout } from '@modules/auth'
import { GenerateLink } from '@utils/router'
import { useErrorHandler } from '@app/usecases/core/states'

export const useSessionSignout = () => {
	const state = reactive({
		loading: false
	})
	const { error, setError } = useErrorHandler()
	const signout = async () => {
		setError('')
		state.loading = true
		try {
			await SessionSignout.call()
			window.location.assign(GenerateLink({ path: '/auth/signin', differentSubdomain: true }))
		} catch (error) { setError(error) }
		state.loading = false
	}

	return { ...toRefs(state), error, signout }
}
