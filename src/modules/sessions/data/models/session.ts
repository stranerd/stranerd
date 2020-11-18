import firebase from 'firebase'
import { UserBio } from '@modules/users'

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
		createdAt: firebase.firestore.Timestamp
		endedAt?: firebase.firestore.Timestamp
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
