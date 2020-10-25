import { reactive, toRefs } from '@nuxtjs/composition-api'
import { SessionSignout } from '@modules/auth'

export const useLogout = () => {
	const state = reactive({
		loading: false,
		error: ''
	})
	const logout = async () => {
		state.loading = true
		await SessionSignout.call()
		state.loading = false
	}

	return { ...toRefs(state), logout }
}
