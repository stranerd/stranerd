import { HttpClient, FirestoreGetClauses, FirestoreService, QueryParams } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { SessionToModel, SessionFromModel } from '../models/session'
import { SessionBaseDataSource } from './session-base'

export class SessionDataSource implements SessionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (session: Partial<SessionToModel>) {
	  return await this.stranerdClient.post<any, any>('/sessions', session)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, any>(`/sessions/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/sessions', query)
	}

	async listenToOne (id: string, callback: (session: (SessionFromModel | null)) => void): Promise<() => void> {
		return await FirestoreService.listenToOne<SessionFromModel>(callback, 'sessions', id)
	}

	async listenToMany (callback: (sessions: SessionFromModel[]) => void, conditions?: FirestoreGetClauses): Promise<() => void> {
		return await FirestoreService.listenToMany<SessionFromModel>(callback, 'sessions', conditions)
	}

	async accept (id: string, accepted: boolean) {
		return await this.stranerdClient.put<any, any>(`/sessions/${id}/accept`, { accepted })
	}

	async cancel (id: string) {
		return await this.stranerdClient.put<any, any>(`/sessions/${id}/cancle`, {})
	}
}
