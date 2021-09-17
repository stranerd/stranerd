import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { ICommentRepository } from '../../domain/irepositories/icomment'
import { CommentEntity } from '../../domain/entities/comment'
import { CommentBaseDataSource } from '../datasources/comment-base'
import { CommentTransformer } from '../transformers/comment'
import { CommentFromModel, CommentToModel } from '../models/comment'

export class CommentRepository implements ICommentRepository {
	private dataSource: CommentBaseDataSource
	private transformer: CommentTransformer

	constructor (dataSource: CommentBaseDataSource, transformer: CommentTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listen (baseId: string, callback: (entities: CommentEntity[]) => void, conditions?: DatabaseGetClauses) {
		const cb = (documents: CommentFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return this.dataSource.listenToOne(baseId, cb, conditions)
	}

	async add (data: CommentToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: CommentToModel) {
		return await this.dataSource.update(id, data)
	}
}
