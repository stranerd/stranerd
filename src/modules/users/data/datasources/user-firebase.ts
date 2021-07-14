import { DatabaseService, FunctionsService, DatabaseGetClauses } from '@modules/core'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel, UserToModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get<UserFromModel>(`profiles/${id}`)
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<UserFromModel>('profiles', conditions)
	}

	async listen (id: string, callback: (model: UserFromModel | null) => void, updateStatus = false) {
		return await DatabaseService.listen<UserFromModel>(`profiles/${id}`, callback, undefined, updateStatus)
	}

	async listenToMany (callback: (models: UserFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<UserFromModel>('profiles', callback, conditions)
	}

	async update (id: string, data: Partial<UserToModel>) {
		await DatabaseService.update<Partial<UserToModel>>(`profiles/${id}`, data)
		return id
	}

	async updateStreak () {
		await FunctionsService.call('updateStreak', {})
	}
}
