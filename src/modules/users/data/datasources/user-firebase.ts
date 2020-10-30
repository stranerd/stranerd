import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource {
	async find (id: string) {
		return await FirestoreService.find('users', id) as UserFromModel | undefined
	}

	async get (conditions?: GetClauses) {
		return await FirestoreService.get('users', conditions) as UserFromModel[]
	}
}
