import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
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

	async get (conditions?: FirestoreGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

	async listen (callback: (entities: QuestionEntity[]) => void, conditions?: FirestoreGetClauses) {
		const cb = (documents: QuestionFromModel[]) => {
			const entities = documents.map((doc) => this.transformer.fromJSON(doc))
			callback(entities)
		}
		return this.dataSource.listen(cb, conditions)
	}

	async add (data: QuestionToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}
}
