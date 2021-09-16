import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { ChatBaseDataSource } from '../datasources/chat-base'
import { ChatTransformer } from '../transformers/chat'
import { IChatRepository } from '../../domain/irepositories/ichat'
import { ChatFromModel, ChatMetaFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'

export class ChatRepository implements IChatRepository {
	private dataSource: ChatBaseDataSource
	private transformer: ChatTransformer

	constructor (dataSource: ChatBaseDataSource, transformer: ChatTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (path: [string, string], data: ChatToModel) {
		return await this.dataSource.create(path, data)
	}

	async get (path: [string, string], query: QueryParams) {
		const models = await this.dataSource.get(path, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async getMeta (id: string, query: QueryParams) {
		const models = await this.dataSource.getMeta(id, query)
		return {
			...models,
			results: models.results.map(this.transformer.metaFromJSON)
		}
	}

	async find (path: [string, string], id: string) {
		const model = await this.dataSource.find(path, id)
		return model ? this.transformer.fromJSON(model) : model
	}

	async listen (path: [string, string], callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ChatFromModel[]) => callback(documents.map(this.transformer.fromJSON))
		return await this.dataSource.listen(path, listenCB, conditions)
	}

	async listenToMeta (id: string, callback: (entities: ChatMetaEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ChatMetaFromModel[]) => callback(documents.map(this.transformer.metaFromJSON))
		return await this.dataSource.listenToMeta(id, listenCB, conditions)
	}

	async markRead (path: [string, string], chatId: string, to: string) {
		await this.dataSource.markRead(path, chatId, to)
	}
}
