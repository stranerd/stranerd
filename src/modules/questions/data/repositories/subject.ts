import { DatabaseGetClauses } from '@modules/core'
import { ISubjectRepository } from '../../domain/irepositories/isubject'
import { SubjectBaseDataSource } from '../datasources/subject-base'
import { SubjectTransformer } from '../transformers/subject'
import { SubjectToModel } from '../models/subject'

export class SubjectRepository implements ISubjectRepository {
	private dataSource: SubjectBaseDataSource
	private transformer: SubjectTransformer

	constructor (dataSource: SubjectBaseDataSource, transformer: SubjectTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map(this.transformer.fromJSON)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}

	async add (data: SubjectToModel) {
		return await this.dataSource.add(data)
	}

	async update (id: string, data: SubjectToModel) {
		return await this.dataSource.update(id, data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}
}
