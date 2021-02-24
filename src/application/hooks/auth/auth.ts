import { computed, reqSsrRef, watch } from '@nuxtjs/composition-api'
import { FindUser, ListenToUser, UserEntity } from '@modules/users'
import { AuthDetails } from '@modules/auth/domain/entities/auth'
import { setStudentSession, setTutorSession } from '@app/hooks/sessions/session'

const global = {
	auth: reqSsrRef(null as AuthDetails | null),
	user: reqSsrRef(null as UserEntity | null),
	listener: null as null | (() => void)
}

export const useAuth = () => {
	const id = computed({ get: () => global.auth.value?.id, set: () => {} })
	const bio = computed({ get: () => global.user.value?.userBio, set: () => {} })

	const isLoggedIn = computed({ get: () => !!id.value, set: () => {} })
	const token = computed({ get: () => global.auth.value?.token, set: () => {} })
	const isVerified = computed({ get: () => !!global.auth.value?.isVerified, set: () => {} })
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
		isLoggedIn, token, isVerified, isAdmin, isTutor,
		setAuthUser, startProfileListener,
		signout, closeProfileListener: () => global.listener?.()
	}
}

watch(() => global.user.value?.meta?.currentSession, () => {
	if (global.user.value?.meta?.currentSession) setStudentSession(global.auth.value?.id!, global.user.value.meta.currentSession)
})
watch(() => global.user.value?.tutor?.currentSession, () => {
	if (global.user.value?.tutor?.currentSession) setTutorSession(global.auth.value?.id!, global.user.value.tutor.currentSession)
})
