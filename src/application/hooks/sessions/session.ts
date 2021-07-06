import { computed, Ref, ssrRef, useFetch, watch } from '@nuxtjs/composition-api'
import { useListener, useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { GetSessions, ListenToSession, ListenToSessions, SessionEntity } from '@modules/sessions'
import { useSessionModal } from '@app/hooks/core/modals'
import VueRouter from 'vue-router'
import { useAuth } from '@app/hooks/auth/auth'
import { UserBio } from '@modules/users'

const g = {
	sessionId: ssrRef(null as string | null),
	session: ssrRef(null as SessionEntity | null),
	clone: ssrRef(null as SessionEntity | null),
	listener: null as ReturnType<typeof useListener> | null
}

const global = {} as Record<string, {
	sessions: Ref<SessionEntity[]>,
	fetched: Ref<boolean>,
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const setSession = async (userId: string, id: string | null, router: VueRouter) => {
	if (g.sessionId.value !== id) {
		g.listener?.closeListener()
		g.sessionId.value = id
		g.session.value = null
		if (id && userId) {
			g.listener = useListener(async () => {
				const runSession = async (entity: SessionEntity | null) => {
					if (entity) {
						g.session.value = entity
						g.clone.value = entity
						await actOnSessionState(getSessionState(userId, entity), router)
					}
				}
				return await ListenToSession.call(id, runSession)
			})
			await g.listener.startListener()
		}
	}
}

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
	const studentWaiting = session.studentId === id && !session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorAcceptsSession = session.tutorId === id && session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorAcceptedSession = session.studentId === id && session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorCancelsSession = session.tutorId === id && !session.accepted && session.cancelled.tutor && !session.cancelled.student
	const tutorCancelledSession = session.studentId === id && session.cancelled.tutor && !session.cancelled.student
	const studentCancelledSession = session.tutorId === id && session.cancelled.student && !session.cancelled.tutor

	if (newSessionRequest) return SessionState.NewSessionRequest
	if (studentWaiting) return SessionState.StudentWaiting
	if (tutorAcceptsSession) return SessionState.TutorAccepts
	if (tutorAcceptedSession) return SessionState.TutorAccepted
	if (tutorCancelsSession) return SessionState.TutorCancels
	if (tutorCancelledSession) return SessionState.TutorCancelled
	if (studentCancelledSession) return SessionState.StudentCancelled
	return SessionState.Unknown
}

const actOnSessionState = async (state: SessionState, router: VueRouter) => {
	useSessionModal().closeAll()
	if (state === SessionState.NewSessionRequest) useSessionModal().openNewSessionRequest()
	else if (state === SessionState.TutorCancels) useSessionModal().closeAll()
	else if (state === SessionState.StudentWaiting) useSessionModal().openStudentWaiting()
	else if (state === SessionState.TutorCancelled || state === SessionState.StudentCancelled) {
		if (state === SessionState.TutorCancelled) useSessionModal().openTutorCancelled()
		if (state === SessionState.StudentCancelled) useSessionModal().openStudentCancelled()
	} else if (state === SessionState.TutorAccepts || state === SessionState.TutorAccepted) {
		useSessionModal().closeAll()
		const session = g.session.value! ?? {}
		const id = state === SessionState.TutorAccepts ? session.studentId : session.tutorId
		await router.push(`/messages/${id}`)
	}
}

export const useCurrentSession = () => {
	const { id } = useAuth()

	const clone = computed({
		get: () => g.clone.value ?? null,
		set: () => {}
	})

	const currentSession = computed({
		get: () => g.session.value ?? null,
		set: () => {}
	})

	const endDate = computed({
		get: () => g.session.value?.endedAt ?? Date.now(),
		set: () => {}
	})

	const isAccepted = computed({
		get: () => g.session.value?.accepted ?? false,
		set: () => {}
	})

	const otherParticipant = computed({
		get: () :UserBio & { id: string } => {
			const session = clone.value
			if (!session) return {} as UserBio & { id: string }
			if (session.studentId === id.value) return { ...session.tutorBio, id: session.tutorId }
			else return { ...session.studentBio, id: session.studentId }
		},
		set: () => {}
	})

	return { currentSession, otherParticipant, endDate, isAccepted, clone }
}

const useSession = (key: SessionKey, callback: (sessions: SessionEntity[]) => void) => {
	const { user } = useAuth()
	const listenerCb = async () => {
		if (!user.value) return () => {}
		const cb = (sessions: SessionEntity[]) => {
			callback(sessions)
			global[key].sessions.value = sessions
		}
		return ListenToSessions.call(user.value.session[key], cb)
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
		if (!user.value) return
		try {
			global[key].setLoading(true)
			const sessions = await GetSessions.call(user.value.session[key])
			callback(sessions)
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

// eslint-disable-next-line no-console
const callback = console.log

export const useRequestSessions = () => useSession('requests', callback)
export const useLobbySessions = () => useSession('lobby', callback)

type SessionKey = 'requests' | 'lobby'
