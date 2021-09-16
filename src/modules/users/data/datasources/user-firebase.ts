import { DatabaseService, FunctionsService, Listeners, QueryParams } from '@modules/core'
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

	async listenToOne (id: string, listener: Listeners<UserFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<UserFromModel>(`profiles/${id}`, listener)
	}

	async listenToMany (listener: Listeners<UserFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<UserFromModel>('profiles', listener)
	}

	async updateStreak () {
		await FunctionsService.call('updateStreak', {})
	}
}
