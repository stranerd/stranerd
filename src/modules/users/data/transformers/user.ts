import { timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, dates } = model
		return new UserEntity({
			id, bio, roles,
			dates: {
				registeredAt: timestampToDate(dates.registeredAt)!
			}
		})
	}

	toJSON (entity: UserEntity) :UserToModel {
		return {
			bio: entity.userBio,
			roles: entity.roles
		}
	}
}
