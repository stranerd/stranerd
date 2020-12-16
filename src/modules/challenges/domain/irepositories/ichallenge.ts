import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ChallengeEntity } from '../entities/challenge'
import { ChallengeToModel } from '../../data/models/challenge'

export interface IChallengeRepository {
	add: (data: ChallengeToModel) => Promise<string>
	update: (id:string, data: ChallengeToModel) => Promise<void>
	get: (conditions?: FirestoreGetClauses) => Promise<ChallengeEntity[]>
	find: (id: string) => Promise<ChallengeEntity | null>
	delete: (id: string) => Promise<void>
}
