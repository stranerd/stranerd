import { UserBio } from '@modules/users'
import { Timestamp } from '@modules/core/data/models/base'

export interface SessionFromModel {
	id: string
	studentId: string
	studentBio: UserBio
	tutorId: string
	tutorBio: UserBio
	duration: number
	accepted: boolean
	price: number
	paid: boolean
	cancelled: { tutor: boolean, student: boolean }
	reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}
	dates: {
		createdAt: Timestamp
		endedAt?: Timestamp
	}
}

export interface SessionToModel {
	studentId: string
	studentBio: UserBio
	tutorId: string
	tutorBio: UserBio
	duration: number
	price: number
	paid: boolean
	accepted: boolean
	reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}
	cancelled: { tutor: boolean, student: boolean }
}
