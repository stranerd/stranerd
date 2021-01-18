import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationBaseDataSource } from './notification-base'

export class NotificationFirebaseDataSource implements NotificationBaseDataSource {
	async create (userId: string, data: NotificationToModel) {
		return await DatabaseService.create(`users/${userId}/notifications`, data)
	}

	async find (userId: string, id: string) {
		return await DatabaseService.get(`users/${userId}/notifications/${id}`) as NotificationFromModel | undefined
	}

	async get (userId: string, conditions?: DatabaseGetClauses): Promise<NotificationFromModel[]> {
		return await DatabaseService.getMany(`users/${userId}/notifications`, conditions)
	}

	async listen (userId: string, callback: (documents: NotificationFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany(`users/${userId}/notifications`, callback, conditions)
	}

	async update (userId: string, id: string, data: Partial<NotificationToModel>) {
		await DatabaseService.update(`users/${userId}/notifications/${id}`, data)
		return id
	}

	async delete (userId: string, id: string) {
		return await DatabaseService.delete(`users/${userId}/notifications/${id}`)
	}
}
