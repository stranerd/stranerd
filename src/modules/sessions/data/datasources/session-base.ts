import { FirestoreGetClauses, QueryParams, QueryResults } from '@modules/core'
import { SessionFromModel, SessionToModel } from '../models/session'

export abstract class SessionBaseDataSource {
	public abstract create: (data: SessionToModel) => Promise<string>
	public abstract accept: (id: string, accepted: boolean) => Promise<void>
	public abstract cancel: (id: string) => Promise<void>
	public abstract get: (query: QueryParams) => Promise<QueryResults<SessionFromModel>>
	public abstract listenToOne: (id: string, callback: (session: SessionFromModel | null) => void) => Promise<() => void>
	public abstract listenToMany: (callback: (sessions: SessionFromModel[]) => void, condition?: FirestoreGetClauses) => Promise<() => void>
	public abstract find: (id: string) => Promise<SessionFromModel | null>
}
