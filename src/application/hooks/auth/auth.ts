import { computed, reqSsrRef } from '@nuxtjs/composition-api'
import { FindUser, ListenToUser, UserEntity } from '@modules/users'
import { AuthDetails } from '@modules/auth/domain/entities/auth'

const global = {
	auth: reqSsrRef(null as AuthDetails | null),
	user: reqSsrRef(null as UserEntity | null),
	listener: null as null | (() => void)
}

export const useAuth = () => {
	const id = computed({ get: () => global.auth.value?.id, set: () => {} })
	const bio = computed({ get: () => global.user.value?.userBio, set: () => {} })
	const currentChallenge = computed({ get: () => global.user.value?.meta.currentChallenge ?? null, set: () => {} })

	const isLoggedIn = computed({ get: () => !!id.value, set: () => {} })
	const token = computed({ get: () => global.auth.value?.token, set: () => {} })
	const isAdmin = computed({ get: () => !!global.user.value?.roles.isAdmin, set: () => {} })
	const isTutor = computed({ get: () => !!global.user.value?.roles.isTutor, set: () => {} })

	const setAuthUser = async (details: AuthDetails | null) => {
		if (global.listener) global.listener()
		global.auth.value = details
		if (details?.id) global.user.value = await FindUser.call(details.id)
		else global.user.value = null
	}

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const id = global.auth.value?.id
		const setUser = (user: UserEntity | null) => global.user.value = user
		if (id) global.listener = await ListenToUser.call(id, setUser, true)
	}

	const signout = async () => setAuthUser(null)

	return {
		id, bio,
		user: global.user,
		isLoggedIn, token, isAdmin, isTutor, currentChallenge,
		setAuthUser, startProfileListener,
		signout, closeProfileListener: () => global.listener?.()
	}
}
