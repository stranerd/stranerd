import { timestampToDateString } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { ChallengeFromModel, ChallengeToModel } from '../models/challenge'
import { ChallengeEntity } from '../../domain/entities/challenge'

export class ChallengeTransformer {
	fromJSON (model: ChallengeFromModel) {
		const { id, type, description, reward, count, time, meta, dates: { createdAt } } = model
		return new ChallengeEntity({
			id, type, description, reward, count, time, meta,
			createdAt: timestampToDateString(createdAt)
		})
	}

	toJSON (entity: ChallengeEntity) :ChallengeToModel {
		return {
			type: entity.type,
			description: entity.description,
			reward: entity.reward,
			count: entity.count,
			time: entity.time,
			meta: entity.meta
		}
	}
}
