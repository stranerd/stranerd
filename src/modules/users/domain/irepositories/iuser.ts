import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { UserEntity } from '../entities/user'

export interface IUserRepository {
	find: (id: string) => Promise<UserEntity | null>,
	get: (query: QueryParams) => Promise<QueryResults<UserEntity>>
	listenToOne: (id: string, listener: Listeners<UserEntity>) => Promise<() => void>
	listenToMany: (listener: Listeners<UserEntity>) => Promise<() => void>
	updateStreak: () => Promise<void>
}
