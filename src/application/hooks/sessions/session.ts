import { ssrRef } from '@nuxtjs/composition-api'
import { useListener } from '@app/hooks/core/states'
import { ListenToSession, SessionEntity } from '@modules/sessions'
import { useSessionModal } from '@app/hooks/core/modals'
import { Notify } from '@app/hooks/core/notifications'
import VueRouter from 'vue-router'

const global = {
	studentSessionId: ssrRef(null as string | null),
	tutorSessionId: ssrRef(null as string | null),
	studentSession: ssrRef(null as SessionEntity | null),
	tutorSession: ssrRef(null as SessionEntity | null),
	studentListener: null as ReturnType<typeof useListener> | null,
	tutorListener: null as ReturnType<typeof useListener> | null
}

export const setStudentSession = (userId: string, id: string, router: VueRouter) => {
	if (global.studentSessionId.value !== id) {
		if (global.studentListener) global.studentListener.closeListener()
		global.studentSessionId.value = id
		global.studentListener = useListener(async () => {
			const runSession = async (entity: SessionEntity | null) => {
				if (entity) {
					global.studentSession.value = entity
					await actOnSessionState(getSessionState(userId, entity), router)
				}
			}
			return await ListenToSession.call(id, runSession)
		})
	}
}

export const setTutorSession = (userId: string, id: string, router: VueRouter) => {
	if (global.tutorSessionId.value !== id) {
		if (global.tutorListener) global.tutorListener.closeListener()
		global.tutorSessionId.value = id
		global.tutorListener = useListener(async () => {
			const runSession = async (entity: SessionEntity | null) => {
				if (entity) {
					global.tutorSession.value = entity
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
		// TODO: Correct sessionId route after implementing ui
		if (state === SessionState.TutorAccepts && global.tutorListener) {
			await router.push(`/sessions/${global.tutorSessionId.value}`)
			global.tutorListener.closeListener()
		}
		if (state === SessionState.TutorAccepted && global.studentListener) {
			await router.push(`/sessions/${global.studentSessionId.value}`)
			global.studentListener.closeListener()
		}
		await Notify({
			icon: 'success',
			title: 'The session is beginning'
		})
	} else useSessionModal().setSessionModalUnknown()
}
