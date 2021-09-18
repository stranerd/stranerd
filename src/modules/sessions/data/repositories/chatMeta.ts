import { Listeners, QueryParams } from '@modules/core'
import { ChatMetaBaseDataSource } from '../datasources/chatMeta-base'
import { ChatMetaTransformer } from '../transformers/chatMeta'
import { IChatMetaRepository } from '../../domain/irepositories/ichatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'

export class ChatMetaRepository implements IChatMetaRepository {
	private dataSource: ChatMetaBaseDataSource
	private transformer: ChatMetaTransformer

	constructor (dataSource: ChatMetaBaseDataSource, transformer: ChatMetaTransformer) {
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

	async listenToOne (id: string, listener: Listeners<ChatMetaEntity>) {
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

	async listenToMany (listener: Listeners<ChatMetaEntity>) {
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
}
