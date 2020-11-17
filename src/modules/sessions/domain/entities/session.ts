import { BaseEntity } from '@modules/core/domains/entities/base'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly studentId: string
	readonly tutorId: string
	readonly duration: number
	readonly price: number
	readonly paid: boolean
	readonly accepted: boolean
	readonly cancelled: { student: boolean, tutor: boolean }
	readonly reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}

	readonly createdAt: Date
	readonly endedAt?: Date

	constructor ({
		id, studentId, tutorId, duration, price, paid,
		accepted, createdAt, cancelled, reviews, endedAt
	}: SessionConstructorArgs) {
		super()
		this.id = id
		this.studentId = studentId
		this.tutorId = tutorId
		this.duration = duration
		this.price = price
		this.paid = paid
		this.accepted = accepted
		this.cancelled = cancelled
		this.reviews = reviews
		this.createdAt = createdAt
		this.endedAt = endedAt
	}
}

type SessionConstructorArgs = {
	id: string, studentId: string, tutorId: string, duration: number, price: number, paid: boolean,
	accepted: boolean, cancelled: { tutor: boolean, student: boolean },
	reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	},
	createdAt: Date, endedAt?: Date,
}
