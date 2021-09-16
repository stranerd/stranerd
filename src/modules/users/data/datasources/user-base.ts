import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { UserFromModel } from '../models/user'

export abstract class UserBaseDataSource {
	abstract find: (id: string) => Promise<UserFromModel | null>
	abstract get: (query: QueryParams) => Promise<QueryResults<UserFromModel>>
	abstract listen: (id: string, callback: (user: UserFromModel | null) => void, updateStatus: boolean) => Promise<() => void>
	abstract listenToMany: (callback: (users: UserFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract updateStreak: () => Promise<void>
}
