import { DatabaseGetClauses } from '@modules/core'
import { INotificationRepository } from '../../domain/irepositories/inotification'
import { NotificationBaseDataSource } from '../datasources/notification-base'
import { NotificationTransformer } from '../transformers/notification'
import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationEntity } from '../../domain/entities/notification'

export class NotificationRepository implements INotificationRepository {
	private dataSource: NotificationBaseDataSource
	private transformer: NotificationTransformer

	constructor (dataSource: NotificationBaseDataSource, transformer: NotificationTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (userId: string, data: NotificationToModel) {
		return await this.dataSource.create(userId, data)
	}

	async find (userId: string, id: string) {
		const model = await this.dataSource.find(userId, id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (userId: string, conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(userId, conditions)
		return models.map((model: NotificationFromModel) => this.transformer.fromJSON(model))
	}

	async listen (userId: string, callback: (entities: NotificationEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: NotificationFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return await this.dataSource.listen(userId, listenCB, conditions)
	}

	async update (userId: string, id: string, data: Partial<NotificationToModel>) {
		return await this.dataSource.update(userId, id, data)
	}

	async delete (userId: string, id: string) {
		return await this.dataSource.delete(userId, id)
	}
}
