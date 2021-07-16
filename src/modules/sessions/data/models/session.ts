import { UserBio } from '@modules/users'
import { Timestamp } from '@modules/core'

export interface SessionFromModel {
	id: string
	message: string
	studentId: string
	studentBio: UserBio
	tutorId: string
	tutorBio: UserBio
	duration: number
	accepted: boolean
	price: number
	cancelled: { tutor: boolean, student: boolean, busy: boolean }
	reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}
	dates: {
		createdAt: Timestamp
		endedAt?: Timestamp
	}
}

export interface SessionToModel {
	message: string
	studentId: string
	studentBio: UserBio
	tutorId: string
	tutorBio: UserBio
	duration: number
	price: number
	accepted: boolean
	reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}
	cancelled: { tutor: boolean, student: boolean, busy: boolean }
}
