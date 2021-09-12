import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly message: string
	readonly studentId: string
	readonly studentBio: UserBio
	readonly tutorId: string
	readonly tutorBio: UserBio
	readonly duration: number
	readonly price: number
	readonly accepted: boolean
	readonly done: boolean
	readonly cancelled: { student: boolean, tutor: boolean, busy: boolean }
	readonly reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}

	readonly createdAt: number
	readonly endedAt?: number

	constructor ({
		             id, duration, price, message,
		             studentId, tutorId, studentBio, tutorBio,
		             accepted, done, createdAt, cancelled, reviews, endedAt
	             }: SessionConstructorArgs) {
		super()
		this.id = id
		this.message = message
		this.studentId = studentId
		this.studentBio = generateDefaultBio(studentBio)
		this.tutorId = tutorId
		this.tutorBio = generateDefaultBio(tutorBio)
		this.duration = duration
		this.price = price
		this.accepted = accepted ?? false
		this.done = done ?? false
		this.cancelled = cancelled
		this.reviews = reviews
		this.createdAt = createdAt
		this.endedAt = endedAt
	}

	get studentAvatar () {
		return this.studentBio.photo
	}

	get tutorAvatar () {
		return this.tutorBio.photo
	}

	get wasCancelled () {
		return this.cancelled.busy || this.cancelled.student || this.cancelled.tutor
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, message: string,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean, done: boolean,
	cancelled: { tutor: boolean, student: boolean, busy: boolean },
	reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	},
	createdAt: number, endedAt?: number,
}
