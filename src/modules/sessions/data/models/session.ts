import firebase from 'firebase'

export interface SessionFromModel {
	id: string
	student: string
	tutor: string
	duration: number
	accepted: boolean
	price: number
	paid: boolean
	cancelled: {
		tutor: boolean
		student: boolean
	}
	reviews?: {
		student: { rating?: number, comment?: string }
		tutor: { rating?: number, comment?: string }
	}
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface SessionToModel {
	student: string
	tutor: string
	duration: number
	price: number
	paid: boolean
	accepted: boolean
	reviews: {
		student?: { rating?: number, comment?: string }
		tutor?: { rating?: number, comment?: string }
	}
	cancelled: {
		tutor?: boolean
		student?: boolean
	}
}
