import { UserEntity } from '../entities/user'

export interface IUserRepository {
	find: (id: string) => Promise<UserEntity | undefined>
}
