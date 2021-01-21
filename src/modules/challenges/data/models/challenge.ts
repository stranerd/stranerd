import { Timestamp } from '@modules/core/services/initFirebase'
import { ChallengeTypes } from '../../domain/entities/challenge'

export interface ChallengeFromModel {
	id: string
	type: ChallengeTypes
	description: string
	reward: number
	count: number
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
	count: number
	time: number
	meta: Record<string, any>
}
