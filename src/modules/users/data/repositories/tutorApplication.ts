import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ITutorApplicationRepository } from '../../domain/irepositories/itutorApplication'
import { TutorApplicationBaseDataSource } from '../datasources/tutorApplication-base'
import { TutorApplicationTransformer } from '../transformers/tutorApplication'
import { TutorApplicationFromModel, TutorApplicationToModel } from '../models/tutorApplication'
import { TutorApplicationEntity } from '../../domain/entities/tutorApplication'

export class TutorApplicationRepository implements ITutorApplicationRepository {
	private dataSource: TutorApplicationBaseDataSource
	private transformer: TutorApplicationTransformer

	constructor (dataSource: TutorApplicationBaseDataSource, transformer: TutorApplicationTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: TutorApplicationToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (conditions?: FirestoreGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: TutorApplicationFromModel) => this.transformer.fromJSON(model))
	}

	async listen (callback: (entities: TutorApplicationEntity[]) => void, conditions?: FirestoreGetClauses) {
		const listenCB = (documents: TutorApplicationFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return await this.dataSource.listen(listenCB, conditions)
	}

	async update (id: string, data: Partial<TutorApplicationToModel>) {
		return await this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
