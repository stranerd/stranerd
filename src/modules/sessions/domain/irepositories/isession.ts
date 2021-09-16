import { FirestoreGetClauses, QueryParams } from '@modules/core'
import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'

export interface ISessionRepository {
	add: (data: Partial<SessionToModel>) => Promise<string>,
	get: (query: QueryParams) => Promise<SessionEntity[]>
	find: (id: string) => Promise<SessionEntity | null>
	listenToOne: (id: string, callback: (entity: SessionEntity | null) => void) => Promise<() => void>
	listenToMany: (callback: (entities: SessionEntity[]) => void, conditions?: FirestoreGetClauses) => Promise<() => void>
	accept: (id: string, accepted: boolean) => Promise<void>
	cancel: (id: string) => Promise<void>
}
