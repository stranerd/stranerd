import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, rankings, meta, chats, status, tutor, dates, achievements } = model
		return new UserEntity({
			id, bio, roles, account, chats, rankings, meta, status, tutor, achievements,
			dates: {
				signedUpAt: timestampToMs(dates?.signedUpAt)
			}
		})
	}

	toJSON (entity: UserEntity) :UserToModel {
		return {
			bio: entity.userBio,
			roles: entity.roles,
			account: entity.account,
			meta: entity.meta,
			chats: Object.fromEntries(entity.chats.map((chat) => [chat.id, chat])),
			rankings: entity.rankings,
			status: entity.status,
			...(entity.tutor ? { tutor: entity.tutor } : {}),
			dates: entity.dates
		}
	}
}
