import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, rankings, status, tutor, dates } = model
		return new UserEntity({
			id, bio, roles, account, rankings, status, tutor,
			dates: {
				signedUpAt: timestampToMs(dates?.signedUpAt)
			}
		})
	}

	toJSON (entity: UserEntity) :UserToModel {
		return {
			bio: entity.userBio,
			roles: entity.roles,
			account: {
				...entity.account,
				meta: Object.entries(entity.account.meta).reduce((acc, [key, val]) => {
					// @ts-ignore
					acc[key] = Array.isArray(val) ? Object.fromEntries(val.map((c) => [c, true])) : val
					return acc
				}, {} as UserFromModel['account']['meta'])
			},
			rankings: entity.rankings,
			status: entity.status,
			...(entity.tutor ? { tutor: entity.tutor } : {}),
			dates: entity.dates
		}
	}
}
