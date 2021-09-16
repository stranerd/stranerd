import { DatabaseService, Listeners, QueryParams } from '@modules/core'
import { NotificationFromModel } from '../models/notification'
import { NotificationBaseDataSource } from './notification-base'

export class NotificationFirebaseDataSource implements NotificationBaseDataSource {
	async find (userId: string, id: string) {
		return await DatabaseService.get<NotificationFromModel>(`users/${userId}/notifications/${id}`)
	}

	// @ts-ignore
	async get (userId: string, query: QueryParams) {
		// @ts-ignore
		return await DatabaseService.getMany<NotificationFromModel>(`users/${userId}/notifications`, query)
	}

	async listenToOne (userId: string, id: string, listener: Listeners<NotificationFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<NotificationFromModel>(`users/${userId}/notifications/${id}`, listener)
	}

	async listenToMany (userId: string, listener: Listeners<NotificationFromModel>) {
		// @ts-ignore
		return await DatabaseService.listenToMany<NotificationFromModel>(`users/${userId}/notifications`, listener)
	}

	async markSeen (userId: string, id: string, seen: boolean) {
		await DatabaseService.update<boolean>(`users/${userId}/notifications/${id}/seen`, seen)
		return true
	}

	async delete (userId: string, id: string) {
		return await DatabaseService.delete(`users/${userId}/notifications/${id}`)
	}
}
