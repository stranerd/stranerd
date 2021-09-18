import { HttpClient, QueryParams, QueryResults, Listeners, listenOnSocket } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionBaseDataSource } from './session-base'

export class SessionApiDataSource implements SessionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (data: SessionToModel) {
		const session = await this.stranerdClient.post<SessionToModel, SessionFromModel>('/sessions', data)
		return session.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, SessionFromModel>(`/sessions/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<SessionFromModel>>('/sessions', query)
	}

	async listenToOne (id: string, listener: Listeners<SessionFromModel>) {
		return listenOnSocket(`sessions/${id}`, listener)
	}

	async listenToMany (listener: Listeners<SessionFromModel>) {
		return listenOnSocket('sessions', listener)
	}

	async accept (id: string, accepted: boolean) {
		await this.stranerdClient.put<{ accepted: boolean }, boolean>(`/sessions/${id}/accept`, { accepted })
	}

	async cancel (id: string) {
		await this.stranerdClient.put<{}, boolean>(`/sessions/${id}/cancel`, {})
	}
}
