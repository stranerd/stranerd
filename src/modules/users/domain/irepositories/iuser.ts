import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { UserEntity } from '../entities/user'

export interface IUserRepository {
	find: (id: string) => Promise<UserEntity | undefined>,
	get: (conditions?: DatabaseGetClauses) => Promise<UserEntity[]>
}
