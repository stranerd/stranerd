import { reactive, toRefs } from '@nuxtjs/composition-api'
import { SessionSignout } from '@modules/auth'

export const useLogout = () => {
	const state = reactive({
		loading: false,
		error: ''
	})
	const logout = async () => {
		state.error = ''
		state.loading = true
		try {
			await SessionSignout.call()
		} catch (error) { state.error = error }
		state.loading = false
	}

	return { ...toRefs(state), logout }
}
