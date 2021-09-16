import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { ChatBaseDataSource } from '../datasources/chat-base'
import { ChatTransformer } from '../transformers/chat'
import { IChatRepository } from '../../domain/irepositories/ichat'
import { ChatFromModel, ChatMeta, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'

export class ChatRepository implements IChatRepository {
	private dataSource: ChatBaseDataSource
	private transformer: ChatTransformer

	constructor (dataSource: ChatBaseDataSource, transformer: ChatTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: ChatToModel) {
		return await this.dataSource.create(data)
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return models.map(this.transformer.fromJSON)
	}

	async getMeta (query: QueryParams) {
		const models = await this.dataSource.getMeta(query)
		return models.map(this.transformer.metaFromJSON)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : model
	}

	async listen (callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ChatFromModel[]) => callback(documents.map(this.transformer.fromJSON))
		return await this.dataSource.listen(listenCB, conditions)
	}

	async listenToMeta (id: string, callback: (entities: ChatMetaEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ChatMeta[]) => callback(documents.map(this.transformer.metaFromJSON))
		return await this.dataSource.listenToMeta(id, listenCB, conditions)
	}

	async markRead (chatId: string, to: string) {
		await this.dataSource.markRead(chatId, to)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
