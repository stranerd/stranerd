import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { SessionBaseDataSource } from '../datasources/session-base'
import { SessionTransformer } from '../transformers/session'
import { ISessionRepository } from '../../domain/irepositories/isession'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'

export class SessionRepository implements ISessionRepository {
	private dataSource: SessionBaseDataSource
	private transformer: SessionTransformer

	constructor (dataSource: SessionBaseDataSource, transformer: SessionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: Partial<SessionToModel>) {
		return await this.dataSource.create(data)
	}

	async get (conditions?: FirestoreGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map(this.transformer.fromJSON)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : model
	}

	async listenToOne (id: string, callback: (entity: SessionEntity | null) => void) {
		const listenCB = (document: SessionFromModel | null) => callback(
			document ? this.transformer.fromJSON(document) : null
		)
		return await this.dataSource.listenToOne(id, listenCB)
	}

	async update (id: string, data: Partial<SessionToModel>) {
		return await this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
