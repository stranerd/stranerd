import { FirestoreService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ChallengeBaseDataSource } from '../datasources/challenge-base'
import { ChallengeFromModel, ChallengeToModel } from '../models/challenge'

export class ChallengeFirebaseDataSource implements ChallengeBaseDataSource {
	async find (id: string) {
		return await FirestoreService.find('challenges', id) as ChallengeFromModel | null
	}

	async get (conditions?: FirestoreGetClauses) {
		return await FirestoreService.get('challenges', conditions) as ChallengeFromModel[]
	}

	async add (data: ChallengeToModel) {
		return await FirestoreService.create('challenges', data)
	}

	async update (id: string, data: ChallengeToModel) {
		return await FirestoreService.update('challenges', id, data)
	}

	async delete (id: string) {
		return await FirestoreService.delete('challenges', id)
	}
}
