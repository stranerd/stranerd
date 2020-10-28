import { reqRef, computed } from '@nuxtjs/composition-api'

type Auth = {
	id: string,
	email: string | null,
	verified: boolean,
	provider: string
	token: string
}

const global = {
	auth: reqRef(null as Auth | null)
}

export const useAuth = () => {
	return {
		isLoggedIn: computed(() => !!global.auth.value?.id),
		token: computed(() => global.auth.value?.token),
		setAuthDetails: (details: Auth | null) => global.auth.value = details
	}
}
