import { ChallengeClone } from '@modules/challenges/domain/entities/challenge'

export interface PersonalChallengeFromModel {
	id: string
	progress: number
	clone: ChallengeClone
	dates: {
		createdAt: number
	}
}

export interface PersonalChallengeToModel {
	progress: number
	clone: ChallengeClone
}
