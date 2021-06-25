import { computed, ssrRef } from '@nuxtjs/composition-api'
import { useListener } from '@app/hooks/core/states'
import { ListenToSession, SessionEntity } from '@modules/sessions'
import { useSessionModal } from '@app/hooks/core/modals'
import VueRouter from 'vue-router'
import { useAuth } from '@app/hooks/auth/auth'
import { UserBio } from '@modules/users'

const global = {
	sessionId: ssrRef(null as string | null),
	session: ssrRef(null as SessionEntity | null),
	clone: ssrRef(null as SessionEntity | null),
	listener: null as ReturnType<typeof useListener> | null
}

export const setSession = async (userId: string, id: string | null, router: VueRouter) => {
	if (global.sessionId.value !== id) {
		global.listener?.closeListener()
		global.sessionId.value = id
		global.session.value = null
		if (id && userId) {
			global.listener = useListener(async () => {
				const runSession = async (entity: SessionEntity | null) => {
					if (entity) {
						global.session.value = entity
						global.clone.value = entity
						await actOnSessionState(getSessionState(userId, entity), router)
					}
				}
				return await ListenToSession.call(id, runSession)
			})
			await global.listener.startListener()
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
		const session = global.session.value! ?? {}
		const id = state === SessionState.TutorAccepts ? session.studentId : session.tutorId
		await router.push(`/messages/${id}`)
	}
}

export const useCurrentSession = () => {
	const { id } = useAuth()

	const clone = computed({
		get: () => global.clone.value ?? null,
		set: () => {}
	})

	const currentSession = computed({
		get: () => global.session.value ?? null,
		set: () => {}
	})

	const endDate = computed({
		get: () => global.session.value?.endedAt ?? Date.now(),
		set: () => {}
	})

	const isAccepted = computed({
		get: () => global.session.value?.accepted ?? false,
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
