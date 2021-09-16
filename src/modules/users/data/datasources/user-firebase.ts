import { DatabaseGetClauses, DatabaseService, FunctionsService, QueryParams } from '@modules/core'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get<UserFromModel>(`profiles/${id}`)
	}

	// @ts-ignore
	async get (query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<UserFromModel>('profiles', query)
	}

	async listen (id: string, callback: (model: UserFromModel | null) => void, updateStatus = false) {
		return await DatabaseService.listen<UserFromModel>(`profiles/${id}`, callback, undefined, updateStatus)
	}

	async listenToMany (callback: (models: UserFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<UserFromModel>('profiles', callback, conditions)
	}

	async updateStreak () {
		await FunctionsService.call('updateStreak', {})
	}
}
