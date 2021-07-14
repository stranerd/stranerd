import { DatabaseGetClauses } from '@modules/core'
import { IReviewRepository } from '../../domain/irepositories/ireview'
import { ReviewBaseDataSource } from '../datasources/review-base'
import { ReviewTransformer } from '../transformers/review'
import { ReviewFromModel } from '../models/review'
import { ReviewEntity } from '../../domain/entities/review'

export class ReviewRepository implements IReviewRepository {
	private dataSource: ReviewBaseDataSource
	private transformer: ReviewTransformer

	constructor (dataSource: ReviewBaseDataSource, transformer: ReviewTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (userId: string, conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(userId, conditions)
		return models.map((model: ReviewFromModel) => this.transformer.fromJSON(model))
	}

	async listen (userId: string, callback: (entities: ReviewEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ReviewFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return await this.dataSource.listen(userId, listenCB, conditions)
	}
}
