import { timestampToMs } from '@modules/core'
import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, status, tutor, session, dates } = model
		return new UserEntity({
			id, bio, roles, account, status, tutor, session,
			dates: {
				signedUpAt: timestampToMs(dates?.signedUpAt),
				deletedAt: dates?.deletedAt ? timestampToMs(dates?.deletedAt) : null
			}
		})
	}

	toJSON (entity: UserEntity) :UserToModel {
		return {
			bio: entity.bio,
			roles: entity.roles,
			account: entity.account,
			status: entity.status,
			tutor: entity.tutor,
			session: entity.session,
			dates: entity.dates
		}
	}
}
