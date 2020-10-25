import { reactive, toRefs } from '@nuxtjs/composition-api'
import { SessionSignout } from '@modules/auth'
import { GenerateLink } from '@utils/router'

export const useSessionSignout = () => {
	const state = reactive({
		loading: false,
		error: ''
	})
	const signout = async () => {
		state.error = ''
		state.loading = true
		try {
			await SessionSignout.call()
			window.location.assign(GenerateLink({ path: '/auth/signin', differentSubdomain: true }))
		} catch (error) { state.error = error }
		state.loading = false
	}

	return { ...toRefs(state), signout }
}
