import { Timestamp } from '@modules/core/services/initFirebase'

export interface ChallengeFromModel {
	id: string
	type: string
	description: string
	reward: number
	time: number
	meta: Record<string, any>
	dates: {
		createdAt: Timestamp
	}
}

export interface ChallengeToModel {
	type: string
	description: string
	reward: number
	time: number
	meta: Record<string, any>
}
