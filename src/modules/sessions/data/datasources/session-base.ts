import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { SessionFromModel, SessionToModel } from '../models/session'

export abstract class SessionBaseDataSource {
	public abstract create: (data: Partial<SessionToModel>) => Promise<string>
	public abstract get: (condition?: FirestoreGetClauses) => Promise<SessionFromModel[]>
	public abstract listenToOne: (id: string, callback: (session: SessionFromModel | null) => void) => Promise<() => void>
	public abstract find: (id: string) => Promise<SessionFromModel | null>
	public abstract update: (id: string, data: Partial<SessionToModel>) => Promise<void>
	public abstract delete: (id: string) => Promise<void>
}
