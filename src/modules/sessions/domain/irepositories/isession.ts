import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'

export interface ISessionRepository {
	add: (data: Partial<SessionToModel>) => Promise<string>,
	get: (conditions?: FirestoreGetClauses) => Promise<SessionEntity[]>
	find: (id: string) => Promise<SessionEntity | null>
	listenToOne: (id: string, callback: (entity: SessionEntity | null) => void) => Promise<() => void>
	update: (id: string, data: Partial<SessionToModel>) => Promise<void>
	delete: (id: string) => Promise<void>
}
