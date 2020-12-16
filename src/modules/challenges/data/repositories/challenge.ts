import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IChallengeRepository } from '../../domain/irepositories/ichallenge'
import { ChallengeBaseDataSource } from '../datasources/challenge-base'
import { ChallengeTransformer } from '../transformers/challenge'
import { ChallengeToModel } from '../models/challenge'

export class ChallengeRepository implements IChallengeRepository {
	private dataSource: ChallengeBaseDataSource
	private transformer: ChallengeTransformer

	constructor (dataSource: ChallengeBaseDataSource, transformer: ChallengeTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (conditions?: FirestoreGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map(this.transformer.fromJSON)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}

	async add (data: ChallengeToModel) {
		return await this.dataSource.add(data)
	}

	async update (id: string, data: ChallengeToModel) {
		return await this.dataSource.update(id, data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}
}
