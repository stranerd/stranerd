import { timestampToDateString } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, rankings, meta, dates } = model
		return new UserEntity({
			id, bio, roles, account, rankings, meta,
			dates: {
				signedUpAt: timestampToDateString(dates?.signedUpAt)
			}
		})
	}

	toJSON (entity: UserEntity) :UserToModel {
		return {
			bio: entity.userBio
		}
	}
}
