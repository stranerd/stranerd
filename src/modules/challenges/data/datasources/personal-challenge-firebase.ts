import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { PersonalChallengeBaseDataSource } from '../datasources/personal-challenge-base'
import { PersonalChallengeFromModel, PersonalChallengeToModel } from '../models/personal-challenge'

export class PersonalChallengeFirebaseDataSource implements PersonalChallengeBaseDataSource {
	async find (userId: string, id: string) {
		return await DatabaseService.get(`users/${userId}/challenges/${id}`) as PersonalChallengeFromModel | null
	}

	async get (userId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.get(`users/${userId}/challenges`, conditions) as PersonalChallengeFromModel[]
	}

	async listenToMany (userId: string, callback: (challenges: PersonalChallengeFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany(`users/${userId}/challenges`, callback, conditions)
	}

	async add (userId: string, data: PersonalChallengeToModel) {
		return await DatabaseService.create(`users/${userId}/challenges`, data)
	}

	async update (userId: string, id: string, data: PersonalChallengeToModel) {
		return await DatabaseService.update(`users/${userId}/challenges/${id}`, data)
	}

	async delete (userId: string, id: string) {
		return await DatabaseService.delete(`users/${userId}/challenges/${id}`)
	}
}
