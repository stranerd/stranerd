import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IAnswerRepository } from '../../domain/irepositories/ianswer'
import { AnswerEntity } from '../../domain/entities/answer'
import { AnswerBaseDataSource } from '../datasources/answer-base'
import { AnswerTransformer } from '../transformers/answer'
import { AnswerFromModel, AnswerToModel } from '../models/answer'

export class AnswerRepository implements IAnswerRepository {
	private dataSource: AnswerBaseDataSource
	private transformer: AnswerTransformer

	constructor (dataSource: AnswerBaseDataSource, transformer: AnswerTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (conditions?: FirestoreGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map(this.transformer.fromJSON)
	}

	async listenToOne (id: string, callback: (entity: AnswerEntity | null) => void) {
		const cb = (document: AnswerFromModel | null) => {
			const entity = document ? this.transformer.fromJSON(document) : null
			callback(entity)
		}
		return this.dataSource.listenToOne(id, cb)
	}

	async listenToMany (callback: (entities: AnswerEntity[]) => void, conditions?: FirestoreGetClauses) {
		const cb = (documents: AnswerFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return this.dataSource.listenToMany(cb, conditions)
	}

	async add (data: AnswerToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: Partial<AnswerToModel>) {
		return await this.dataSource.update(id, data)
	}

	async rate (id: string, userId: string, rating: number) {
		return await this.dataSource.rate(id, userId, rating)
	}

	async markAsBestAnswer (questionId: string, answerId: string) {
		return await this.dataSource.markAsBest({ questionId, answerId })
	}
}
