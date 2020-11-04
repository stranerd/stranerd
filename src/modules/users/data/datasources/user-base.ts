import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { UserFromModel } from '../models/user'

export abstract class UserBaseDataSource {
	public abstract find: (id: string) => Promise<UserFromModel | undefined>
	public abstract get: (condition?: DatabaseGetClauses) => Promise<UserFromModel[]>
}
