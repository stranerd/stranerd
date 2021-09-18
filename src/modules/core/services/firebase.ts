import { SessionToModel } from '@modules/sessions/data/models/session'
import { functions } from './initFirebase'

export interface FUNCTIONS {
	toggleAdmin: { id: string, isAdmin: boolean },
	requestNewSession: { session: Partial<SessionToModel> },
	acceptSession: { id: string, accepted: boolean },
	cancelSession: { id: string },
	makeStripePayment: { amount: number, currency: string },
	buyCoins: { amount: number, isGold: boolean },
	updateStreak: {},
	rateTutor: { tutorId: string, rating: number, review: string | undefined },
	approveTutorApplication: { id: string, approved: boolean },
	markAsBestAnswer: { questionId: string, answerId: string }
	handleReport: { id: string, key: string, userId: string }
	newReferral: { referrerId: string, userId: string, email: string }
}

export interface FUNCTION_RETURNS {
	toggleAdmin: void,
	requestNewSession: string,
	acceptSession: void,
	cancelSession: void,
	makeStripePayment: string,
	buyCoins: void,
	updateStreak: { skip: boolean, increase: boolean, reset: boolean, streak: number },
	rateTutor: string,
	approveTutorApplication: void,
	markAsBestAnswer: void
	handleReport: void
	newReferral: void
}

export const FunctionsService = {
	call: async function call<T extends keyof FUNCTIONS> (name: T, data: FUNCTIONS[T]) {
		const callable = functions.httpsCallable(name)
		const result = await callable(data)
		return result.data as FUNCTION_RETURNS[T]
	}
}
