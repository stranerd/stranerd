import { FirestoreService, FunctionsService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionBaseDataSource } from './session-base'

export class SessionFirebaseDataSource implements SessionBaseDataSource {
	async create (data: Partial<SessionToModel>): Promise<string> {
		return await FunctionsService.call('requestNewSession', data)
	}

	async find (id: string) {
		return await FirestoreService.find('sessions', id) as SessionFromModel | null
	}

	async get (conditions?: FirestoreGetClauses): Promise<SessionFromModel[]> {
		return await FirestoreService.get('sessions', conditions) as SessionFromModel[]
	}

	async listenToOne (id: string, callback: (session: (SessionFromModel | null)) => void): Promise<() => void> {
		return await FirestoreService.listenToOne(callback, 'sessions', id)
	}

	async update (id: string, data: Partial<SessionToModel>) {
		return await FirestoreService.update('sessions', id, data)
	}

	async delete (id: string) {
		return await FirestoreService.delete('sessions', id)
	}
}
