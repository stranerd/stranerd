import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { PersonalChallengeEntity } from '../entities/personal-challenge'
import { PersonalChallengeToModel } from '../../data/models/personal-challenge'

export interface IPersonalChallengeRepository {
	add: (userId: string, data: PersonalChallengeToModel) => Promise<string>
	update: (userId: string, id:string, data: PersonalChallengeToModel) => Promise<void>
	get: (userId: string, conditions?: DatabaseGetClauses) => Promise<PersonalChallengeEntity[]>
	find: (userId: string, id: string) => Promise<PersonalChallengeEntity | null>
	delete: (userId: string, id: string) => Promise<void>
}
