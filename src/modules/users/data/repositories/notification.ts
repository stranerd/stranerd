import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { INotificationRepository } from '../../domain/irepositories/inotification'
import { NotificationBaseDataSource } from '../datasources/notification-base'
import { NotificationTransformer } from '../transformers/notification'
import { NotificationFromModel } from '../models/notification'
import { NotificationEntity } from '../../domain/entities/notification'

export class NotificationRepository implements INotificationRepository {
	private dataSource: NotificationBaseDataSource
	private transformer: NotificationTransformer

	constructor (dataSource: NotificationBaseDataSource, transformer: NotificationTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async find (userId: string, id: string) {
		const model = await this.dataSource.find(userId, id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (userId: string, query: QueryParams) {
		const models = await this.dataSource.get(userId, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listen (userId: string, callback: (entities: NotificationEntity[]) => void, conditions?: DatabaseGetClauses) {
		const listenCB = (documents: NotificationFromModel[]) => {
			const entities = documents.map(this.transformer.fromJSON)
			callback(entities)
		}
		return await this.dataSource.listen(userId, listenCB, conditions)
	}

	async markSeen (userId: string, id: string, seen: boolean) {
		return await this.dataSource.markSeen(userId, id, seen)
	}
}
