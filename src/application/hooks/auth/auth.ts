import { computed, reqSsrRef } from '@nuxtjs/composition-api'
import { FindUser, ListenToUser, UserEntity } from '@modules/users'
import { AuthDetails } from '@modules/auth/domain/entities/auth'
import { SessionSignout } from '@modules/auth'
import { isClient } from '@utils/environment'
import { useEditModal } from '@app/hooks/core/modals'
import { analytics, auth } from '@modules/core/services/initFirebase'
import VueRouter from 'vue-router'

const global = {
	auth: reqSsrRef(null as AuthDetails | null),
	user: reqSsrRef(null as UserEntity | null),
	location: {},
	listener: null as null | (() => void),
	showProfileModal: reqSsrRef(true)
}

export const useAuth = () => {
	const id = computed({ get: () => global.auth.value?.id ?? '', set: () => {} })
	const bio = computed({ get: () => global.user.value?.userBio, set: () => {} })

	const isLoggedIn = computed({ get: () => !!id.value && !!global.user.value, set: () => {} })
	const isVerified = computed({ get: () => !!global.auth.value?.isVerified, set: () => {} })
	const isAdmin = computed({ get: () => !!global.user.value?.roles.isAdmin, set: () => {} })
	const isTutor = computed({ get: () => !!global.user.value?.roles.isTutor, set: () => {} })
	const ongoingAchievements = computed({
		get: () => global.user.value?.achievements.filter((achievement) => !achievement.completed) ?? [],
		set: () => {}
	})
	const currentSessionId = computed({
		get: () => global.user.value?.currentSession ?? null,
		set: () => {}
	})

	const setUserLocation = (data:object) => {
		global.location = data
	}
	const setAuthUser = async (details: AuthDetails | null, router: VueRouter) => {
		if (global.listener) global.listener()
		global.auth.value = details
		if (details?.id) {
			if (!details.isVerified) {
				await router.push('/auth/verify')
				return false
			}
			global.user.value = await FindUser.call(details.id)
		} else global.user.value = null
		return true
	}

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const id = global.auth.value?.id
		const setUser = (user: UserEntity | null) => {
			if (user?.userBio.isNew && global.showProfileModal.value) useEditModal().openAccountProfile()
			global.user.value = user
		}
		if (id) {
			global.listener = await ListenToUser.call(id, setUser, true)
			// TODO: Figure out why it throws errors
			// await UpdateStreak.call().catch(console.log)
		}
	}

	const signin = async (remembered: boolean) => {
		try {
			if (global.auth.value?.token) await auth.signInWithCustomToken(global.auth.value.token)
			await startProfileListener()
			analytics.logEvent('login', { remembered })
		} catch (e) { await signout() }
	}

	const signout = async () => {
		await SessionSignout.call()
		await setAuthUser(null, {} as VueRouter)
		await auth.signOut()
		if (isClient()) window.location.assign('/')
	}

	return {
		id, bio, user: global.user, auth: global.auth,
		isLoggedIn, isVerified, isAdmin, isTutor, ongoingAchievements, currentSessionId,
		setAuthUser, setUserLocation, signin, signout
	}
}

export const setShowProfileModal = (show: boolean) => global.showProfileModal.value = show
