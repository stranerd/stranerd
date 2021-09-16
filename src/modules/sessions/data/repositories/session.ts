import { FirestoreGetClauses, QueryParams } from '@modules/core'
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

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
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

	async listenToMany (callback: (entities: SessionEntity[]) => void, conditions?: FirestoreGetClauses) {
		const listenCB = (documents: SessionFromModel[]) => callback(
			documents.map(this.transformer.fromJSON)
		)
		return await this.dataSource.listenToMany(listenCB, conditions)
	}

	async accept (id: string, accepted: boolean) {
		return await this.dataSource.accept(id, accepted)
	}

	async cancel (id: string) {
		return await this.dataSource.cancel(id)
	}
}
