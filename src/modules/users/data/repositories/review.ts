import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { IReviewRepository } from '../../domain/irepositories/ireview'
import { ReviewBaseDataSource } from '../datasources/review-base'
import { ReviewTransformer } from '../transformers/review'
import { ReviewFromModel, ReviewToModel } from '../models/review'
import { ReviewEntity } from '../../domain/entities/review'

export class ReviewRepository implements IReviewRepository {
	private dataSource: ReviewBaseDataSource
	private transformer: ReviewTransformer

	constructor (dataSource: ReviewBaseDataSource, transformer: ReviewTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async create (data: ReviewToModel) {
		return this.dataSource.create(data)
	}

	async get (userId: string, query: QueryParams) {
		const models = await this.dataSource.get(userId, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listen (userId: string, callback: (entities: ReviewEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ReviewFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return await this.dataSource.listen(userId, listenCB, conditions)
	}
}
