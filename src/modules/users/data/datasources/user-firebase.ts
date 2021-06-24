import { DatabaseService, FunctionsService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel, UserToModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get(`profiles/${id}`) as UserFromModel | null
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany('profiles', conditions) as UserFromModel[]
	}

	async listen (id: string, callback: (model: UserFromModel | null) => void, updateStatus = false) {
		return await DatabaseService.listen(`profiles/${id}`, callback, undefined, updateStatus)
	}

	async listenToMany (callback: (models: UserFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany('profiles', callback, conditions)
	}

	async update (id: string, data: Partial<UserToModel>) {
		await DatabaseService.update(`profiles/${id}`, data)
		return id
	}

	async updateStreak () {
		await FunctionsService.call('updateStreak', {})
	}
}
