import { computed, reqSsrRef } from '@nuxtjs/composition-api'
import { FindUser, ListenToUser, UserEntity } from '@modules/users'
import { AuthDetails } from '@modules/auth/domain/entities/auth'
import { SessionSignout } from '@modules/auth'
import { isClient } from '@utils/environment'

const global = {
	auth: reqSsrRef(null as AuthDetails | null),
	user: reqSsrRef(null as UserEntity | null),
	listener: null as null | (() => void)
}

export const useAuth = () => {
	const id = computed({ get: () => global.auth.value?.id ?? '', set: () => {} })
	const bio = computed({ get: () => global.user.value?.userBio, set: () => {} })

	const isLoggedIn = computed({ get: () => !!id.value, set: () => {} })
	const token = computed({ get: () => global.auth.value?.token, set: () => {} })
	const isVerified = computed({ get: () => !!global.auth.value?.isVerified, set: () => {} })
	const isAdmin = computed({ get: () => !!global.user.value?.roles.isAdmin, set: () => {} })
	const isTutor = computed({ get: () => !!global.user.value?.roles.isTutor, set: () => {} })
	const ongoingAchievements = computed({
		get: () => global.user.value?.achievements?.filter((achievement) => !achievement.completed) ?? [],
		set: () => {}
	})
	const currentSessionId = computed({
		get: () => global.user.value?.currentSession ?? null,
		set: () => {}
	})

	const setAuthUser = async (details: AuthDetails | null) => {
		if (global.listener) global.listener()
		if (details?.id) {
			global.user.value = await FindUser.call(details.id)
		} else global.user.value = null
		global.auth.value = details
	}

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const id = global.auth.value?.id
		const setUser = (user: UserEntity | null) => global.user.value = user
		if (id) {
			global.listener = await ListenToUser.call(id, setUser, true)
			// TODO: Figure out why it throws errors
			// await UpdateStreak.call().catch(console.log)
		}
	}

	const signout = async () => {
		await SessionSignout.call()
		await setAuthUser(null)
		if (isClient()) window.location.assign('/')
	}

	return {
		id, bio,
		user: global.user,
		isLoggedIn, token, isVerified, isAdmin, isTutor, ongoingAchievements, currentSessionId,
		setAuthUser, startProfileListener, signout
	}
}
