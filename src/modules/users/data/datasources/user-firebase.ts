import { DatabaseService } from '@modules/core/services/firebase'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get(`users/${id}/profile`) as UserFromModel | undefined
	}
}
