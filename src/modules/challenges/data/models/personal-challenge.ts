import { ChallengeClone } from '@modules/challenges/domain/entities/challenge'

export interface PersonalChallengeFromModel {
	id: string
	progress: number
	clone: ChallengeClone
	cancelled: boolean
	dates: {
		createdAt: number
	}
}

export interface PersonalChallengeToModel {
	progress: number
	clone: ChallengeClone
	cancelled: boolean
}
