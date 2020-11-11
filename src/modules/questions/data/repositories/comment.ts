import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
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

	async get (baseId: string, conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(baseId, conditions)
		return models.map(this.transformer.fromJSON)
	}

	async listen (baseId: string, callback: (entities: CommentEntity[]) => void, conditions?: DatabaseGetClauses) {
		const cb = (documents: CommentFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return this.dataSource.listen(baseId, cb, conditions)
	}

	async add (baseId: string, data: CommentToModel) {
		return await this.dataSource.create(baseId, data)
	}

	async find (baseId: string, id: string) {
		const model = await this.dataSource.find(baseId, id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (baseId: string, id: string, data: object) {
		return await this.dataSource.update(baseId, id, data)
	}
}
