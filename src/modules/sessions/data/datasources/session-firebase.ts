import { FirestoreGetClauses, FirestoreService, FunctionsService, QueryParams } from '@modules/core'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionBaseDataSource } from './session-base'

export class SessionFirebaseDataSource implements SessionBaseDataSource {
	async create (session: Partial<SessionToModel>) {
		return await FunctionsService.call('requestNewSession', { session })
	}

	async accept (id: string, accepted: boolean) {
		return await FunctionsService.call('acceptSession', { id, accepted })
	}

	async cancel (id: string) {
		return await FunctionsService.call('cancelSession', { id })
	}

	async find (id: string) {
		return await FirestoreService.find<SessionFromModel>('sessions', id)
	}

	// @ts-ignore
	async get (query: QueryParams): Promise<SessionFromModel[]> {
		// @ts-ignore
		return await FirestoreService.get<SessionFromModel>('sessions', query)
	}

	// @ts-ignore
	async listenToOne (id: string, callback: (session: (SessionFromModel | null)) => void): Promise<() => void> {
		return await FirestoreService.listenToOne<SessionFromModel>(callback, 'sessions', id)
	}

	// @ts-ignore
	async listenToMany (callback: (sessions: SessionFromModel[]) => void, conditions?: FirestoreGetClauses): Promise<() => void> {
		return await FirestoreService.listenToMany<SessionFromModel>(callback, 'sessions', conditions)
	}
}
