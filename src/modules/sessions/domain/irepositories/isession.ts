import { FirestoreGetClauses, QueryParams, QueryResults } from '@modules/core'
import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'

export interface ISessionRepository {
	add: (data: SessionToModel) => Promise<string>,
	get: (query: QueryParams) => Promise<QueryResults<SessionEntity>>
	find: (id: string) => Promise<SessionEntity | null>
	listenToOne: (id: string, callback: (entity: SessionEntity | null) => void) => Promise<() => void>
	listenToMany: (callback: (entities: SessionEntity[]) => void, conditions?: FirestoreGetClauses) => Promise<() => void>
	accept: (id: string, accepted: boolean) => Promise<void>
	cancel: (id: string) => Promise<void>
}
