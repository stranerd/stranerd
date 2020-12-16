import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ChallengeFromModel, ChallengeToModel } from '../models/challenge'

export abstract class ChallengeBaseDataSource {
	abstract add: (data: ChallengeToModel) => Promise<string>
	abstract update: (id: string, data: ChallengeToModel) => Promise<void>
	abstract get: (condition?: FirestoreGetClauses) => Promise<ChallengeFromModel[]>
	abstract find: (id: string) => Promise<ChallengeFromModel | null>
	abstract delete: (id: string) => Promise<void>
}
