import { Listeners, QueryParams } from '@modules/core'
import { SessionBaseDataSource } from '../datasources/session-base'
import { SessionTransformer } from '../transformers/session'
import { ISessionRepository } from '../../domain/irepositories/isession'
import { SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'

export class SessionRepository implements ISessionRepository {
	private dataSource: SessionBaseDataSource
	private transformer: SessionTransformer

	constructor (dataSource: SessionBaseDataSource, transformer: SessionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: SessionToModel) {
		return await this.dataSource.create(data)
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : model
	}

	async listenToOne (id: string, listener: Listeners<SessionEntity>) {
		return this.dataSource.listenToOne(id, {
			created: async (model) => {
				await listener.created(this.transformer.fromJSON(model))
			},
			updated: async (model) => {
				await listener.updated(this.transformer.fromJSON(model))
			},
			deleted: async (model) => {
				await listener.deleted(this.transformer.fromJSON(model))
			}
		})
	}

	async listenToMany (listener: Listeners<SessionEntity>) {
		return this.dataSource.listenToMany({
			created: async (model) => {
				await listener.created(this.transformer.fromJSON(model))
			},
			updated: async (model) => {
				await listener.updated(this.transformer.fromJSON(model))
			},
			deleted: async (model) => {
				await listener.deleted(this.transformer.fromJSON(model))
			}
		})
	}

	async accept (id: string, accepted: boolean) {
		return await this.dataSource.accept(id, accepted)
	}

	async cancel (id: string) {
		return await this.dataSource.cancel(id)
	}
}
