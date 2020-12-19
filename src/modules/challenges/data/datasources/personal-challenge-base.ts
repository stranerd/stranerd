import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { PersonalChallengeFromModel, PersonalChallengeToModel } from '../models/personal-challenge'

export abstract class PersonalChallengeBaseDataSource {
	abstract add: (userId: string, data: PersonalChallengeToModel) => Promise<string>
	abstract update: (userId: string, id: string, data: PersonalChallengeToModel) => Promise<void>
	abstract get: (userId: string, condition?: DatabaseGetClauses) => Promise<PersonalChallengeFromModel[]>
	abstract listenToMany: (userId: string, callback: (challenges: PersonalChallengeFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract find: (userId: string, id: string) => Promise<PersonalChallengeFromModel | null>
	abstract delete: (userId: string, id: string) => Promise<void>
}
