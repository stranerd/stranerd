import { FirestoreService, FunctionsService, FirestoreGetClauses } from '@modules/core'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionBaseDataSource } from './session-base'

export class SessionFirebaseDataSource implements SessionBaseDataSource {
	async create (session: Partial<SessionToModel>) {
		return await FunctionsService.call('requestNewSession', { session })
	}

	async begin (id: string) {
		return await FunctionsService.call('acceptSession', { id })
	}

	async cancel (id: string) {
		return await FunctionsService.call('cancelSession', { id })
	}

	async find (id: string) {
		return await FirestoreService.find<SessionFromModel>('sessions', id)
	}

	async get (conditions?: FirestoreGetClauses): Promise<SessionFromModel[]> {
		return await FirestoreService.get<SessionFromModel>('sessions', conditions)
	}

	async listenToOne (id: string, callback: (session: (SessionFromModel | null)) => void): Promise<() => void> {
		return await FirestoreService.listenToOne<SessionFromModel>(callback, 'sessions', id)
	}

	async listenToMany (callback: (sessions: SessionFromModel[]) => void, conditions?: FirestoreGetClauses): Promise<() => void> {
		return await FirestoreService.listenToMany<SessionFromModel>(callback, 'sessions', conditions)
	}
}
