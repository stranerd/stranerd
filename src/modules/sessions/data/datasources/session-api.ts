import { FirestoreGetClauses, FirestoreService, HttpClient, QueryParams, QueryResults } from '../../../core'
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

	async listenToOne (id: string, callback: (session: (SessionFromModel | null)) => void): Promise<() => void> {
		return await FirestoreService.listenToOne<SessionFromModel>(callback, 'sessions', id)
	}

	async listenToMany (callback: (sessions: SessionFromModel[]) => void, conditions?: FirestoreGetClauses): Promise<() => void> {
		return await FirestoreService.listenToMany<SessionFromModel>(callback, 'sessions', conditions)
	}

	async accept (id: string, accepted: boolean) {
		await this.stranerdClient.put<{ accepted: boolean }, boolean>(`/sessions/${id}/accept`, { accepted })
	}

	async cancel (id: string) {
		await this.stranerdClient.put<{}, boolean>(`/sessions/${id}/cancel`, {})
	}
}
