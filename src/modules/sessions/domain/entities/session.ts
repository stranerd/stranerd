import { BaseEntity } from '@modules/core/domains/entities/base'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly student: string
	readonly tutor: string
	readonly duration: number
	readonly price: number
	readonly paid: boolean
	readonly accepted: boolean
	readonly createdAt: Date
	readonly cancelled: { student: boolean, tutor: boolean }
	readonly reviews?: {
		student: { rating?: number, comment?: string }
		tutor: { rating?: number, comment?: string }
	}

	constructor ({ id, student, tutor, duration, price, paid, accepted, createdAt, cancelled, reviews }: SessionConstructorArgs) {
		super()
		this.id = id
		this.student = student
		this.tutor = tutor
		this.duration = duration
		this.price = price
		this.paid = paid
		this.accepted = accepted
		this.createdAt = createdAt
		this.cancelled = cancelled
		this.reviews = reviews
	}
}

type SessionConstructorArgs = {
	id: string, student: string, tutor: string, duration: number, price: number, paid: boolean,
	accepted: boolean, createdAt: Date, cancelled: { tutor: boolean, student: boolean },
	reviews?: {
		student: {
			rating?: number
			comment?: string
		}
		tutor: {
			rating?: number
			comment?: string
		}
	}
}
