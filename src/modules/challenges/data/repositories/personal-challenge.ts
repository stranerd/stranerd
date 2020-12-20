import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IPersonalChallengeRepository } from '../../domain/irepositories/ipersonal-challenge'
import { PersonalChallengeBaseDataSource } from '../datasources/personal-challenge-base'
import { PersonalChallengeTransformer } from '../transformers/personal-challenge'
import { PersonalChallengeFromModel, PersonalChallengeToModel } from '../models/personal-challenge'
import { PersonalChallengeEntity } from '../../domain/entities/personal-challenge'

export class PersonalChallengeRepository implements IPersonalChallengeRepository {
	private dataSource: PersonalChallengeBaseDataSource
	private transformer: PersonalChallengeTransformer

	constructor (dataSource: PersonalChallengeBaseDataSource, transformer: PersonalChallengeTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (userId: string, conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(userId, conditions)
		return models.map(this.transformer.fromJSON)
	}

	async listenToMany (userId: string, callback: (challenges: PersonalChallengeEntity[]) => void, conditions?: DatabaseGetClauses) {
		const cb = (challenges: PersonalChallengeFromModel[]) => {
			const entities = challenges.map(this.transformer.fromJSON)
			callback(entities)
		}
		return await this.dataSource.listenToMany(userId, cb, conditions)
	}

	async delete (userId: string, id: string) {
		return await this.dataSource.delete(userId, id)
	}

	async add (userId: string, data: PersonalChallengeToModel) {
		return await this.dataSource.add(userId, data)
	}

	async update (userId: string, id: string, data: Partial<PersonalChallengeToModel>) {
		return await this.dataSource.update(userId, id, data)
	}

	async find (userId: string, id: string) {
		const model = await this.dataSource.find(userId, id)
		return model ? this.transformer.fromJSON(model) : null
	}
}
