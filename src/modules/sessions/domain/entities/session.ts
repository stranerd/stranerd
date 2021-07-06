import { BaseEntity } from '@modules/core/domains/entities/base'
import { generateDefaultBio, UserBio } from '@modules/users'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly studentId: string
	readonly studentBio: UserBio
	readonly tutorId: string
	readonly tutorBio: UserBio
	readonly duration: number
	readonly price: number
	readonly accepted: boolean
	readonly cancelled: { student: boolean, tutor: boolean, busy: boolean }
	readonly reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}

	readonly createdAt: number
	readonly endedAt?: number

	constructor ({
		id, duration, price,
		studentId, tutorId, studentBio, tutorBio,
		accepted, createdAt, cancelled, reviews, endedAt
	}: SessionConstructorArgs) {
		super()
		this.id = id
		this.studentId = studentId
		this.studentBio = generateDefaultBio(studentBio)
		this.tutorId = tutorId
		this.tutorBio = generateDefaultBio(tutorBio)
		this.duration = duration
		this.price = price
		this.accepted = accepted
		this.cancelled = cancelled
		this.reviews = reviews
		this.createdAt = createdAt
		this.endedAt = endedAt
	}

	get studentAvatar () { return this.studentBio.avatar }
	get tutorAvatar () { return this.tutorBio.avatar }

	getState (id: string) {
		const newSessionRequest = this.tutorId === id && !this.accepted && !this.cancelled.tutor && !this.cancelled.student
		const studentWaiting = this.studentId === id && !this.accepted && !this.cancelled.tutor && !this.cancelled.student
		const tutorAcceptsSession = this.tutorId === id && this.accepted && !this.cancelled.tutor && !this.cancelled.student
		const tutorAcceptedSession = this.studentId === id && this.accepted && !this.cancelled.tutor && !this.cancelled.student
		const tutorCancelsSession = this.tutorId === id && !this.accepted && this.cancelled.tutor && !this.cancelled.student
		const tutorCancelledSession = this.studentId === id && this.cancelled.tutor && !this.cancelled.student
		const studentCancelledSession = this.tutorId === id && this.cancelled.student && !this.cancelled.tutor
		const busyCancelledSession = this.studentId === id && this.cancelled.busy

		if (newSessionRequest) return SessionState.NewSessionRequest
		if (studentWaiting) return SessionState.StudentWaiting
		if (tutorAcceptsSession) return SessionState.TutorAccepts
		if (tutorAcceptedSession) return SessionState.TutorAccepted
		if (tutorCancelsSession) return SessionState.TutorCancels
		if (tutorCancelledSession) return SessionState.TutorCancelled
		if (studentCancelledSession) return SessionState.StudentCancelled
		if (busyCancelledSession) return SessionState.BusyCancelled
		return SessionState.Unknown
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean, cancelled: { tutor: boolean, student: boolean, busy: boolean },
	reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	},
	createdAt: number, endedAt?: number,
}

export enum SessionState {
	NewSessionRequest = 100,
	TutorAccepts = 101,
	TutorCancels = 102,
	StudentWaiting = 200,
	TutorAccepted = 201,
	TutorCancelled = 202,
	StudentCancelled = 203,
	BusyCancelled = 204,
	Unknown = 300
}
