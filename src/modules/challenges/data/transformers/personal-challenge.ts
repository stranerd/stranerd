import { PersonalChallengeFromModel, PersonalChallengeToModel } from '../models/personal-challenge'
import { PersonalChallengeEntity } from '../../domain/entities/personal-challenge'

export class PersonalChallengeTransformer {
	fromJSON (model: PersonalChallengeFromModel) {
		const { id, progress, clone, dates: { createdAt } } = model
		return new PersonalChallengeEntity({
			id, progress, clone, createdAt
		})
	}

	toJSON (entity: PersonalChallengeEntity) :PersonalChallengeToModel {
		return {
			progress: entity.progress,
			clone: entity.clone
		}
	}
}
