import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { PersonalChallengeFromModel, PersonalChallengeToModel } from '../models/personal-challenge'
import { PersonalChallengeEntity } from '../../domain/entities/personal-challenge'

export class PersonalChallengeTransformer {
	fromJSON (model: PersonalChallengeFromModel) {
		const { id, progress, clone, cancelled, dates: { createdAt } } = model
		return new PersonalChallengeEntity({
			id, progress, clone, cancelled,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: PersonalChallengeEntity) :PersonalChallengeToModel {
		return {
			progress: entity.progress,
			cancelled: entity.cancelled,
			clone: entity.clone
		}
	}
}
