import { computed, reqSsrRef } from '@nuxtjs/composition-api'
import { FindUser, ListenToUser, Status, UserEntity } from '@modules/users'
import firebase from '@modules/core/services/initFirebase'

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
	const currentChallenge = computed({ get: () => global.user.value?.meta.currentChallenge ?? null, set: () => {} })

	const isLoggedIn = computed({ get: () => !!id.value, set: () => {} })
	const token = computed({ get: () => global.auth.value?.token, set: () => {} })
	const isAdmin = computed({ get: () => !!global.user.value?.roles.isAdmin, set: () => {} })

	const setAuthUser = async (details: Auth | null) => {
		if (global.listener) global.listener()
		if (details?.id) global.user.value = await FindUser.call(details.id)
		else global.user.value = null
		global.auth.value = details
	}

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const id = global.auth.value?.id
		const setUser = (user: UserEntity | null) => global.user.value = user
		if (id) {
			await setOnlineStatus(id)
			global.listener = await ListenToUser.call(id, setUser)
		}
	}

	const signout = async () => setAuthUser(null)

	return {
		id, bio,
		user: global.user,
		isLoggedIn, token, isAdmin, currentChallenge,
		setAuthUser, startProfileListener,
		signout
	}
}

export const setOnlineStatus = async (uid: string) => {
	firebase.database().ref('.info/connected')
		.on('value', async (snapshot) => {
			if (!uid || !snapshot.val()) return

			const statusRef = firebase.database().ref('profiles').child(uid).child('status')

			await statusRef.onDisconnect().set({
				mode: Status.OFFLINE,
				updatedAt: firebase.database.ServerValue.TIMESTAMP
			})

			await statusRef.set({
				mode: Status.ONLINE,
				updatedAt: firebase.database.ServerValue.TIMESTAMP
			})
		})
}
