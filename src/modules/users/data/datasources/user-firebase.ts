import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserFirebaseDataSource implements UserBaseDataSource {
	async find (id: string) {
		return await DatabaseService.get(`users/${id}/profile`) as UserFromModel | undefined
	}

	async get (conditions?: GetClauses) {
		if (conditions?.order) conditions.order.field = 'profile/' + conditions.order.field
		if (conditions?.where) conditions.where = conditions.where
			.map((c) => ({ ...c, field: 'profile/' + c.field }))

		const users = await DatabaseService.getMany('users', conditions)
		return users.map((u: any) => ({ ...u.profile, id: u.id })) as UserFromModel[]
	}
}
