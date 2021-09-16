import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { UserFromModel } from '../models/user'

export abstract class UserBaseDataSource {
	abstract find: (id: string) => Promise<UserFromModel | null>
	abstract get: (query: QueryParams) => Promise<QueryResults<UserFromModel>>
	abstract listenToOne: (id: string, listener: Listeners<UserFromModel>) => Promise<() => void>
	abstract listenToMany: (listener: Listeners<UserFromModel>) => Promise<() => void>
	abstract updateStreak: () => Promise<void>
}
