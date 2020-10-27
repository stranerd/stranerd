import { useContext, computed } from '@nuxtjs/composition-api'
import { Auth as AuthDetails } from '@app/store/auth'

export const Auth = (store = useContext().store) => {
	const state = store.state.auth

	return {
		auth: computed(() => state.auth as AuthDetails | null),
		isLoggedIn: computed(() => store.getters['auth/loading'] as boolean),
		getToken: computed(() => store.getters['auth/getToken'] as string),
		setAuthDetails: (auth: AuthDetails) => store.commit('auth/setAuthDetails', auth)
	}
}
