import { computed, reqSsrRef } from '@nuxtjs/composition-api'
import { ListenToUser, UserEntity } from '@modules/users'

type Auth = {
	id: string,
	email: string | null,
	verified: boolean,
	provider: string
	token: string
}

const global = {
	auth: reqSsrRef(null as Auth | null),
	user: reqSsrRef(null as UserEntity | null),
	listener: null as null | (() => void)
}

export const useAuth = () => {
	const id = computed({ get: () => global.auth.value?.id, set: () => {} })
	const bio = computed({ get: () => global.user.value?.userBio, set: () => {} })

	const isLoggedIn = computed({ get: () => !!id.value, set: () => {} })
	const token = computed({ get: () => global.auth.value?.token, set: () => {} })

	const setAuthDetails = (details: Auth | null) => global.auth.value = details

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const callback = (user: UserEntity | null) => global.user.value = user
		const id = global.auth.value?.id
		if (id) global.listener = await ListenToUser.call(id, callback)
	}

	return {
		id, bio,
		isLoggedIn, token,
		setAuthDetails, startProfileListener
	}
}