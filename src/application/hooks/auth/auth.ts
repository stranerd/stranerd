import { computed, reqSsrRef } from '@nuxtjs/composition-api'
import { ListenToUser, UserEntity, FindUser } from '@modules/users'
import { useEditModal } from '@app/hooks/core/modals'

type Auth = {
	id: string,
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
	const isAdmin = computed({ get: () => !!global.user.value?.roles.isAdmin, set: () => {} })

	const setAuthUser = async (details: Auth | null) => {
		if (global.listener) global.listener()
		if (details?.id) {
			const user = await FindUser.call(details.id)
			global.user.value = user
			if (user && !user.hasSetProfile) useEditModal().setEditModalAccountProfile()
		} else global.user.value = null
		global.auth.value = details
	}

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const id = global.auth.value?.id
		const setUser = (user: UserEntity | null) => global.user.value = user
		if (id) global.listener = await ListenToUser.call(id, setUser)
	}

	const signout = async () => setAuthUser(null)

	return {
		id, bio,
		user: global.user,
		isLoggedIn, token, isAdmin,
		setAuthUser, startProfileListener,
		signout
	}
}
