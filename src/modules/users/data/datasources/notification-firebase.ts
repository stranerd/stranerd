import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationBaseDataSource } from './notification-base'

export class NotificationFirebaseDataSource implements NotificationBaseDataSource {
	async create (userId: string, data: NotificationToModel) {
		return await DatabaseService.create<NotificationToModel>(`users/${userId}/notifications`, data)
	}

	async find (userId: string, id: string) {
		return await DatabaseService.get<NotificationFromModel>(`users/${userId}/notifications/${id}`)
	}

	async get (userId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<NotificationFromModel>(`users/${userId}/notifications`, conditions)
	}

	async listen (userId: string, callback: (documents: NotificationFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<NotificationFromModel>(`users/${userId}/notifications`, callback, conditions)
	}

	async update (userId: string, id: string, data: Partial<NotificationToModel>) {
		await DatabaseService.update<Partial<NotificationToModel>>(`users/${userId}/notifications/${id}`, data)
		return id
	}

	async delete (userId: string, id: string) {
		return await DatabaseService.delete(`users/${userId}/notifications/${id}`)
	}
}
