import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IMessageRepository } from '../../domain/irepositories/imessage'
import { FormBaseDataSource } from '../datasources/form-base'
import { MessageTransformer } from '../transformers/message'
import { MessageFromModel, MessageToModel } from '../models/message'

export class MessageRepository implements IMessageRepository {
	private dataSource: FormBaseDataSource<MessageFromModel, MessageToModel>
	private transformer: MessageTransformer

	constructor (dataSource: FormBaseDataSource<MessageFromModel, MessageToModel>, transformer: MessageTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: MessageToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return undefined
	}

	async get (conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: MessageFromModel) => this.transformer.fromJSON(model))
	}

	async update (id: string, data: MessageToModel) {
		return await this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
