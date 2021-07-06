import { computed, Ref, ssrRef, useFetch, watch } from '@nuxtjs/composition-api'
import { useListener, useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { GetSession, GetSessions, ListenToSessions, SessionEntity } from '@modules/sessions'
import VueRouter from 'vue-router'
import { useAuth } from '@app/hooks/auth/auth'

const g = {
	session: ssrRef(null as SessionEntity | null),
	router: null as VueRouter | null
}

const global = {} as Record<string, {
	sessions: Ref<SessionEntity[]>,
	fetched: Ref<boolean>,
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useCurrentSession = (router?: VueRouter) => {
	const { currentSessionId, id } = useAuth()
	if (router) g.router = router

	const fetchSession = async (userId: string, id: string | null) => {
		if (g.session.value?.id !== id && id) {
			const session = await GetSession.call(id)
			if (session) {
				g.session.value = session
				const state = getSessionState(userId, session)
				if ([SessionState.TutorAccepted, SessionState.TutorAccepts].includes(state)) {
					const id = state === SessionState.TutorAccepts ? session.studentId : session.tutorId
					await g.router?.push(`/messages/${id}`)
				}
			}
		}
	}

	watch(() => currentSessionId.value, async () => {
		await fetchSession(id.value, currentSessionId.value)
	})

	useFetch(async () => {
		await fetchSession(id.value, currentSessionId.value)
	})

	const currentSession = computed({
		get: () => g.session.value ?? null,
		set: () => {}
	})

	const endDate = computed({
		get: () => g.session.value?.endedAt ?? Date.now(),
		set: () => {}
	})

	const otherParticipantId = computed({
		get: () => {
			const session = g.session.value
			if (!session) return null
			if (session.studentId === id.value) return session.tutorId
			else return session.studentId
		},
		set: () => {}
	})

	return { currentSession, otherParticipantId, endDate }
}

const useSession = (key: SessionKey, callback: (sessions: SessionEntity[], id: string) => void) => {
	const { user, id } = useAuth()
	const listenerCb = async () => {
		const sessionIds = user.value?.session?.[key] ?? []
		if (sessionIds.length === 0) return () => {}
		const cb = (sessions: SessionEntity[]) => {
			callback(sessions, id.value!)
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
		const sessionIds = user.value?.session?.[key] ?? []
		if (sessionIds.length === 0) return
		try {
			global[key].setLoading(true)
			const sessions = await GetSessions.call(sessionIds)
			callback(sessions, id.value!)
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

const callback = (sessions: SessionEntity[], id: string) => {
	// Send notifications based on state on sessions
	// eslint-disable-next-line no-console
	console.log(sessions, id)
}

export const useRequestSessions = () => useSession('requests', callback)
export const useLobbySessions = () => useSession('lobby', callback)

type SessionKey = 'requests' | 'lobby'

enum SessionState {
	NewSessionRequest = 100,
	TutorAccepts = 101,
	TutorCancels = 102,
	StudentWaiting = 200,
	TutorAccepted = 201,
	TutorCancelled = 202,
	StudentCancelled = 203,
	Unknown = 300
}

const getSessionState = (id: string, session: SessionEntity) :SessionState => {
	const newSessionRequest = session.tutorId === id && !session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorAcceptedSession = session.studentId === id && session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorCancelledSession = session.studentId === id && session.cancelled.tutor && !session.cancelled.student
	const studentCancelledSession = session.tutorId === id && session.cancelled.student && !session.cancelled.tutor

	if (newSessionRequest) return SessionState.NewSessionRequest
	if (tutorAcceptedSession) return SessionState.TutorAccepted
	if (tutorCancelledSession) return SessionState.TutorCancelled
	if (studentCancelledSession) return SessionState.StudentCancelled
	return SessionState.Unknown
}
