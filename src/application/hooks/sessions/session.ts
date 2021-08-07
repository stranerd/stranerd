import { computed, Ref, ssrRef, useFetch, useRouter, watch } from '@nuxtjs/composition-api'
import VueRouter from 'vue-router'
import { useListener, useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { GetSession, GetSessions, ListenToSession, ListenToSessions, SessionEntity } from '@modules/sessions'
import { useAuth } from '@app/hooks/auth/auth'
import { Alert } from '@app/hooks/core/notifications'
import { setOtherParticipantId } from '@app/hooks/sessions/sessions'
import { useSessionModal } from '@app/hooks/core/modals'

const currentGlobal = {
	previousSession: ssrRef(null as SessionEntity | null),
	currentSession: ssrRef(null as SessionEntity | null),
	listener: useListener(async () => () => {})
}

const global = {} as Record<SessionKey, {
	sessions: Ref<SessionEntity[]>,
	fetched: Ref<boolean>,
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useCurrentSession = () => {
	const { currentSessionId, id } = useAuth()
	const router = useRouter()

	const fetchSession = async (userId: string, id: string | null) => {
		if (!id) currentGlobal.listener.closeListener()
		if (id && currentGlobal.currentSession.value?.id !== id) {
			const session = await GetSession.call(id)
			currentGlobal.currentSession.value = session
			if (session) {
				const id = userId === session.tutorId ? session.studentId : session.tutorId
				await router.push(`/sessions/${id}`)
			}
			await currentGlobal.listener.resetListener(
				async () => ListenToSession.call(id, (s) => {
					const oldDone = currentGlobal.currentSession.value?.done ?? false
					if (!oldDone && s?.done) {
						const id = userId === s.tutorId ? s.studentId : s.tutorId
						setOtherParticipantId(id)
						useSessionModal().openRatings()
					}
					currentGlobal.previousSession.value = currentGlobal.currentSession.value
					if (s) currentGlobal.currentSession.value = s
				})
			)
		}
	}

	watch(() => currentSessionId.value, async () => {
		await fetchSession(id.value, currentSessionId.value)
	})

	useFetch(async () => {
		await fetchSession(id.value, currentSessionId.value)
	})

	const endDate = computed({
		get: () => currentGlobal.currentSession.value?.endedAt ?? Date.now(),
		set: () => {}
	})

	const otherParticipantId = computed({
		get: () => {
			const session = currentGlobal.currentSession.value
			if (!session) return null
			return session.studentId === id.value ? session.tutorId : session.studentId
		},
		set: () => {}
	})

	return { ...currentGlobal, otherParticipantId, endDate }
}

const useSession = (key: SessionKey, router: VueRouter, callback: (key: SessionKey, sessions: SessionEntity[], id: string, router: VueRouter) => void) => {
	const { user, id } = useAuth()
	const listenerCb = async () => {
		const sessionIds = Object.keys(user.value?.session?.[key] ?? {})
		if (sessionIds.length === 0) {
			global[key].sessions.value = []
			return () => {}
		}
		const cb = (sessions: SessionEntity[]) => {
			callback(key, sessions, id.value!, router)
			global[key].sessions.value = sessions
		}
		return ListenToSessions.call(sessionIds, cb)
	}

	if (global[key] === undefined) global[key] = {
		sessions: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler(),
		listener: useListener(listenerCb)
	}

	const fetchSessions = async () => {
		global[key].setError('')
		const sessionIds = Object.keys(user.value?.session?.[key] ?? {})
		if (sessionIds.length === 0) return global[key].sessions.value = []
		try {
			global[key].setLoading(true)
			const sessions = await GetSessions.call(sessionIds)
			callback(key, sessions, id.value!, router)
			global[key].sessions.value = sessions
			global[key].fetched.value = true
		} catch (error) { global[key].setError(error) }
		global[key].setLoading(false)
	}

	useFetch(async () => {
		if (!global[key].fetched.value && !global[key].loading.value) await fetchSessions()
	})

	watch(() => user.value?.session[key], () => {
		if (user.value) global[key].listener.resetListener(listenerCb)
	})

	return { ...global[key] }
}

const callback = (key: SessionKey, sessions: SessionEntity[], userId: string, router: VueRouter) => {
	sessions
		.filter((session) => {
			const index = global[key].sessions.value.findIndex((s) => s.id === session.id)
			return index === -1
		}) // * check if the session has been fetched before
		.filter((session) => session.tutorId === userId)
		.forEach(async (session) => {
			const route = `/sessions/${session.studentId}`
			if (!router || router.currentRoute.path === route) return
			const res = await Alert({
				title: 'New session request',
				text: '',
				icon: 'info',
				cancelButtonText: 'Ignore',
				confirmButtonText: 'Continue'
			})
			if (res) await router.push(route)
		})
		// TODO: Create modal to allow tutor navigate to said page
		// If using modal though, remember that only one instance of the modal can be open at once
}

export const useRequestSessions = (router: VueRouter) => useSession('requests', router, callback)
export const useLobbySessions = (router: VueRouter) => useSession('lobby', router, callback)

type SessionKey = 'requests' | 'lobby'

export const isRequestingSessionWith = (userId: string) => computed({
	get: () => global.requests?.sessions?.value?.find((s) => s.tutorId === userId) ?? null,
	set: () => {}
})

export const hasRequestedSessionWith = (userId: string) => computed({
	get: () => global.lobby?.sessions?.value?.find((s) => s.studentId === userId) ?? null,
	set: () => {}
})
