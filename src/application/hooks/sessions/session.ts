import { ssrRef } from '@nuxtjs/composition-api'
import { useListener } from '@app/hooks/core/states'
import { ListenToSession, SessionEntity } from '@modules/sessions'
import { useSessionModal } from '@app/hooks/core/modals'
import { Notify } from '@app/hooks/core/notifications'
import VueRouter from 'vue-router'

const global = {
	student: {
		sessionId: ssrRef(null as string | null),
		session: ssrRef(null as SessionEntity | null),
		listener: null as ReturnType<typeof useListener> | null
	},
	tutor: {
		sessionId: ssrRef(null as string | null),
		session: ssrRef(null as SessionEntity | null),
		listener: null as ReturnType<typeof useListener> | null
	}
}

export const setSession = (userId: string, key: keyof typeof global, id: string | null, router: VueRouter) => {
	const state = global[key]
	if (state.sessionId.value !== id) {
		if (state.listener) state.listener.closeListener()
		state.sessionId.value = id
		state.session.value = null
		if (id && userId) state.listener = useListener(async () => {
			const runSession = async (entity: SessionEntity | null) => {
				if (entity) {
					state.session.value = entity
					await actOnSessionState(getSessionState(userId, entity), router)
				}
			}
			return await ListenToSession.call(id, runSession)
		})
	}
}

enum SessionState {
	NewSessionRequest = 100,
	TutorAccepts = 101,
	TutorCancels = 102,
	StudentWaiting = 200,
	TutorAccepted = 201,
	TutorCancelled = 202,
	Unknown = 300
}

const getSessionState = (id: string, session: SessionEntity) :SessionState => {
	const newSessionRequest = session.tutorId === id && !session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const studentWaiting = session.studentId === id && !session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorAcceptsSession = session.tutorId === id && session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorAcceptedSession = session.studentId === id && session.accepted && !session.cancelled.tutor && !session.cancelled.student
	const tutorCancelsSession = session.tutorId === id && !session.accepted && session.cancelled.tutor && !session.cancelled.student
	const tutorCancelledSession = session.studentId === id && session.cancelled.tutor && !session.cancelled.student

	if (newSessionRequest) return SessionState.NewSessionRequest
	if (studentWaiting) return SessionState.StudentWaiting
	if (tutorAcceptsSession) return SessionState.TutorAccepts
	if (tutorAcceptedSession) return SessionState.TutorAccepted
	if (tutorCancelsSession) return SessionState.TutorCancels
	if (tutorCancelledSession) return SessionState.TutorCancelled
	return SessionState.Unknown
}

const actOnSessionState = async (state: SessionState, router: VueRouter) => {
	if (state === SessionState.NewSessionRequest) useSessionModal().setSessionModalNewSessionRequest()
	else if (state === SessionState.TutorCancels) useSessionModal().closeSessionModal()
	else if (state === SessionState.StudentWaiting) useSessionModal().setSessionModalStudentWaiting()
	else if (state === SessionState.TutorCancelled) useSessionModal().setSessionModalTutorCancelled()
	else if (state === SessionState.TutorAccepts || state === SessionState.TutorAccepted) {
		if (state === SessionState.TutorAccepts && global.tutor.listener) {
			await router.push(`/messages/${global.tutor.sessionId.value}`)
			global.tutor.listener.closeListener()
		}
		if (state === SessionState.TutorAccepted && global.student.listener) {
			await router.push(`/messages/${global.student.sessionId.value}`)
			global.student.listener.closeListener()
		}
		await Notify({
			icon: 'info',
			title: 'A session is ongoing'
		})
	} else useSessionModal().setSessionModalUnknown()
}
