import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get(`profiles/${id}`) as UserFromModel | undefined
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany('profiles', conditions) as UserFromModel[]
	}
}
