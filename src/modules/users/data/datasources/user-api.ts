import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
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

	async listenToOne (id: string, listeners: Listeners<UserFromModel>) {
		return listenOnSocket(`users/${id}`, listeners)
	}

	async listenToMany (listeners: Listeners<UserFromModel>) {
		return listenOnSocket('users', listeners)
	}

	async updateStreak () {
		type Streak = { skip: boolean, increase: boolean, reset: boolean, streak: number }
		await this.stranerdClient.post<{}, Streak>('/users/streak', {})
	}
}
