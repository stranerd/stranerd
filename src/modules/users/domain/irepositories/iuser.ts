import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { UserEntity } from '../entities/user'

export interface IUserRepository {
	find: (id: string) => Promise<UserEntity | null>,
	get: (conditions?: DatabaseGetClauses) => Promise<UserEntity[]>
	listen: (id: string, callback: (entity: UserEntity | null) => void) => Promise<() => void>
	listenToMany: (callback: (entities: UserEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
}
