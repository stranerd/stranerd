import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, rankings, meta, status, dates } = model
		return new UserEntity({
			id, bio, roles, account, rankings, meta, status,
			dates: {
				signedUpAt: timestampToMs(dates?.signedUpAt)
			}
		})
	}

	toJSON (entity: UserEntity) :UserToModel {
		return {
			bio: entity.userBio
		}
	}
}
