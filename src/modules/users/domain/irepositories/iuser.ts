import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { UserEntity } from '../entities/user'

export interface IUserRepository {
	find: (id: string) => Promise<UserEntity | null>,
	get: (query: QueryParams) => Promise<QueryResults<UserEntity>>
	listen: (id: string, callback: (entity: UserEntity | null) => void, updateStatus: boolean) => Promise<() => void>
	listenToMany: (callback: (entities: UserEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	updateStreak: () => Promise<void>
}
