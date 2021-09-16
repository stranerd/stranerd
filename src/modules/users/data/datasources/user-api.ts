import { DatabaseGetClauses, DatabaseService, HttpClient, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserApiDataSource implements UserBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, UserFromModel>(`/users/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<UserFromModel>>('/users', query)
	}

	async listen (id: string, callback: (model: UserFromModel | null) => void, updateStatus = false) {
		return await DatabaseService.listen<UserFromModel>(`profiles/${id}`, callback, undefined, updateStatus)
	}

	async listenToMany (callback: (models: UserFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<UserFromModel>('profiles', callback, conditions)
	}

	async updateStreak () {
		type Streak = { skip: boolean, increase: boolean, reset: boolean, streak: number }
		await this.stranerdClient.post<{}, Streak>('/users/streak', {})
	}
}
