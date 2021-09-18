import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SessionFromModel, SessionToModel } from '../models/session'

export abstract class SessionBaseDataSource {
	public abstract create: (data: SessionToModel) => Promise<string>
	public abstract accept: (id: string, accepted: boolean) => Promise<void>
	public abstract cancel: (id: string) => Promise<void>
	public abstract get: (query: QueryParams) => Promise<QueryResults<SessionFromModel>>
	abstract listenToOne: (id: string, listener: Listeners<SessionFromModel>) => Promise<() => void>
	abstract listenToMany: (listener: Listeners<SessionFromModel>) => Promise<() => void>
	public abstract find: (id: string) => Promise<SessionFromModel | null>
}
