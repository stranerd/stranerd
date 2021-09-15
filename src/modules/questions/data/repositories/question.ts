import { FirestoreGetClauses, QueryParams } from '@modules/core'
import { IQuestionRepository } from '../../domain/irepositories/iquestion'
import { QuestionEntity } from '../../domain/entities/question'
import { QuestionBaseDataSource } from '../datasources/question-base'
import { QuestionTransformer } from '../transformers/question'
import { QuestionFromModel, QuestionToModel } from '../models/question'

export class QuestionRepository implements IQuestionRepository {
	private dataSource: QuestionBaseDataSource
	private transformer: QuestionTransformer

	constructor (dataSource: QuestionBaseDataSource, transformer: QuestionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return models.map(this.transformer.fromJSON)
	}

	async listenToOne (id: string, callback: (entity: QuestionEntity | null) => void) {
		const cb = (document: QuestionFromModel | null) => {
			callback(document ? this.transformer.fromJSON(document) : null)
		}
		return this.dataSource.listenToOne(id, cb)
	}

	async listenToMany (callback: (entities: QuestionEntity[]) => void, conditions?: FirestoreGetClauses) {
		const cb = (documents: QuestionFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return this.dataSource.listenToMany(cb, conditions)
	}

	async add (data: QuestionToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: Partial<QuestionToModel>) {
		return this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}

	async markBestAnswer (answerid: string) {
		return this.dataSource.markBestAnswer(answerid)
	}
}
