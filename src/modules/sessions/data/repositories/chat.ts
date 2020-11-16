import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatBaseDataSource } from '../datasources/chat-base'
import { ChatTransformer } from '../transformers/chat'
import { IChatRepository } from '../../domain/irepositories/ichat'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatRepository implements IChatRepository {
	private dataSource: ChatBaseDataSource
	private transformer: ChatTransformer

	constructor (dataSource: ChatBaseDataSource, transformer: ChatTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (sessionId: string, data: ChatToModel) {
		return await this.dataSource.create(sessionId, data)
	}

	async get (sessionId: string, conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(sessionId, conditions)
		return models.map(this.transformer.fromJSON)
	}

	async find (sessionId: string, id: string) {
		const model = await this.dataSource.find(sessionId, id)
		return model ? this.transformer.fromJSON(model) : model
	}

	async listen (sessionId: string, callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: ChatFromModel[]) => callback(documents.map(this.transformer.fromJSON))
		return await this.dataSource.listen(sessionId, listenCB, conditions)
	}

	async update (sessionId: string, id: string, data: Partial<ChatToModel>) {
		await this.dataSource.update(sessionId, id, data)
	}

	async delete (sessionId: string, id: string) {
		return await this.dataSource.delete(sessionId, id)
	}
}
