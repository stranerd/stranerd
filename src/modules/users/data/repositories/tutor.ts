import { GetClauses } from '@modules/core/data/datasources/base'
import { ITutorRepository } from '../../domain/irepositories/itutor'
import { TutorBaseDataSource } from '../datasources/tutor-base'
import { TutorTransformer } from '../transformers/tutor'

export class TutorRepository implements ITutorRepository {
	private dataSource: TutorBaseDataSource
	private transformer: TutorTransformer

	constructor (dataSource: TutorBaseDataSource, transformer: TutorTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}

	async add (id: string) {
		return await this.dataSource.add(id)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		return null
	}

	async updateCourse (id: string, subject: string, data: { level: number } | null) {
		return this.dataSource.updateCourse(id, subject, data)
	}
}
