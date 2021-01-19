import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { UserEntity } from '../entities/user'
import { UserToModel } from '../../data/models/user'

export interface IUserRepository {
	find: (id: string) => Promise<UserEntity | null>,
	get: (conditions?: DatabaseGetClauses) => Promise<UserEntity[]>
	listen: (id: string, callback: (entity: UserEntity | null) => void, updateStatus: boolean) => Promise<() => void>
	listenToMany: (callback: (entities: UserEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	update: (id: string, data: Partial<UserToModel>) => Promise<string>
}
