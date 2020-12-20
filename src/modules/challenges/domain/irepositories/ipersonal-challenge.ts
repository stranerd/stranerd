import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { PersonalChallengeEntity } from '../entities/personal-challenge'
import { PersonalChallengeToModel } from '../../data/models/personal-challenge'

export interface IPersonalChallengeRepository {
	add: (userId: string, data: PersonalChallengeToModel) => Promise<string>
	update: (userId: string, id:string, data: Partial<PersonalChallengeToModel>) => Promise<void>
	get: (userId: string, conditions?: DatabaseGetClauses) => Promise<PersonalChallengeEntity[]>
	listenToMany: (userId: string, callback: (challenges: PersonalChallengeEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	find: (userId: string, id: string) => Promise<PersonalChallengeEntity | null>
	delete: (userId: string, id: string) => Promise<void>
}
