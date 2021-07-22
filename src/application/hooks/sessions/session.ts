import { computed, Ref, ssrRef, useFetch, useRouter, watch } from '@nuxtjs/composition-api'
import { useListener, useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { GetSession, GetSessions, ListenToSession, ListenToSessions, SessionEntity } from '@modules/sessions'
import { useAuth } from '@app/hooks/auth/auth'

const currentGlobal = {
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
			currentGlobal.listener.resetListener(
				async () => ListenToSession.call(id, (s) => {
					if (s) currentGlobal.currentSession.value = s
				})
			)
			if (session) {
				currentGlobal.currentSession.value = session
				const id = userId === session.tutorId ? session.tutorId : session.studentId
				await router.push(`/sessions/${id}`)
			}
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

const useSession = (key: SessionKey) => {
	const { user } = useAuth()
	const listenerCb = async () => {
		const sessionIds = Object.keys(user.value?.session?.[key] ?? {})
		if (sessionIds.length === 0) return () => {}
		const cb = (sessions: SessionEntity[]) => {
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
		if (sessionIds.length === 0) return
		try {
			global[key].setLoading(true)
			const sessions = await GetSessions.call(sessionIds)
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

export const useRequestSessions = () => useSession('requests')
export const useLobbySessions = () => useSession('lobby')

type SessionKey = 'requests' | 'lobby'

export const isRequestingSessionWith = (userId: string) => computed({
	get: () => global.requests?.sessions?.value?.find((s) => s.tutorId === userId) ?? null,
	set: () => {}
})

export const hasRequestedSessionWith = (userId: string) => computed({
	get: () => global.lobby?.sessions?.value?.find((s) => s.studentId === userId) ?? null,
	set: () => {}
})
