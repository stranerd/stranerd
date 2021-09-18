import { Listeners, QueryParams } from '@modules/core'
import { IAnswerRepository } from '../../domain/irepositories/ianswer'
import { AnswerEntity } from '../../domain/entities/answer'
import { AnswerBaseDataSource } from '../datasources/answer-base'
import { AnswerTransformer } from '../transformers/answer'
import { AnswerToModel } from '../models/answer'

export class AnswerRepository implements IAnswerRepository {
	private dataSource: AnswerBaseDataSource
	private transformer: AnswerTransformer

	constructor (dataSource: AnswerBaseDataSource, transformer: AnswerTransformer) {
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

	async listenToOne (id: string, listener: Listeners<AnswerEntity>) {
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

	async listenToMany (listener: Listeners<AnswerEntity>) {
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

	async add (data: AnswerToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: AnswerToModel) {
		return await this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
