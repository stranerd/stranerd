import { computed, Ref, ssrRef, useFetch, useRouter, watch } from '@nuxtjs/composition-api'
import { useListener, useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { GetSession, GetSessions, ListenToSession, ListenToSessions, SessionEntity } from '@modules/sessions'
import { useAuth } from '@app/hooks/auth/auth'
import { Notify } from '../core/notifications'

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
				await router.push(`/messages/${id}`)
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

const useSession = (key: SessionKey, callback: (key: SessionKey, sessions: SessionEntity[], id: string) => void) => {
	const { user, id } = useAuth()
	const listenerCb = async () => {
		const sessionIds = Object.keys(user.value?.session?.[key] ?? {})
		if (sessionIds.length === 0) return () => {}
		const cb = (sessions: SessionEntity[]) => {
			callback(key, sessions, id.value!)
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
			callback(key, sessions, id.value!)
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

const callback = (key: SessionKey, sessions: SessionEntity[], id: string) => {
	sessions
		.map((session) => {
			const index = global[key].sessions.value.findIndex((s) => s.id === session.id)
			return index === -1 ? session : null
		}) // check if the session has been fetched before
		.filter((session) => !!session) // remove fetched sessions
		.map((session) => getSessionState(id, session!)) // get session state
		.filter((state, index, self) => self.indexOf(state) === index) // filter down to unique states
		.forEach(async (state) => { // send notification
			let title = ''
			if (state === SessionState.NewSessionRequest) title = 'New Session Request'
			else if (state === SessionState.TutorAccepted) title = 'Your session request was accepted'
			else if (state === SessionState.TutorCancelled) title = 'Your session request was rejected'
			else if (state === SessionState.StudentCancelled) title = 'Your current session was just cancelled'
			else if (state === SessionState.BusyCancelled) title = 'Your session request was rejected'
			if (title) await Notify({ title, icon: 'info' })
		})
}

export const useRequestSessions = () => useSession('requests', callback)
export const useLobbySessions = () => useSession('lobby', callback)

type SessionKey = 'requests' | 'lobby'

enum SessionState {
	NewSessionRequest = 100,
	TutorAccepted = 201,
	TutorCancelled = 202,
	StudentCancelled = 203,
	BusyCancelled = 204,
	Unknown = 300
}

const getSessionState = (id: string, session: SessionEntity) :SessionState => {
	const newSessionRequest = session.tutorId === id && !session.accepted && !session.cancelled.tutor && !session.cancelled.student && !session.cancelled.busy
	const tutorAcceptedSession = session.studentId === id && session.accepted && !session.cancelled.tutor && !session.cancelled.student && !session.cancelled.busy
	const tutorCancelledSession = session.studentId === id && session.cancelled.tutor && !session.cancelled.student && !session.cancelled.busy
	const studentCancelledSession = session.tutorId === id && session.cancelled.student && !session.cancelled.tutor && !session.cancelled.busy
	const busyCancelledSession = session.studentId === id && !session.cancelled.tutor && !session.cancelled.student && session.cancelled.busy

	if (newSessionRequest) return SessionState.NewSessionRequest
	if (tutorAcceptedSession) return SessionState.TutorAccepted
	if (tutorCancelledSession) return SessionState.TutorCancelled
	if (studentCancelledSession) return SessionState.StudentCancelled
	if (busyCancelledSession) return SessionState.BusyCancelled
	return SessionState.Unknown
}
