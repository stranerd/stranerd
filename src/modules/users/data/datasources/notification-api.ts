import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { NotificationFromModel } from '../models/notification'
import { NotificationBaseDataSource } from './notification-base'

export class NotificationApiDataSource implements NotificationBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async find (_: string, id: string) {
		return await this.stranerdClient.get<{}, NotificationFromModel>(`/notifications/${id}`, {})
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<NotificationFromModel>>('/notifications', query)
	}

	async listenToOne (_: string, id: string, listener: Listeners<NotificationFromModel>) {
		return listenOnSocket(`notifications/${id}`, listener)
	}

	async listenToMany (_: string, listener: Listeners<NotificationFromModel>) {
		return listenOnSocket('notifications', listener)
	}

	async markSeen (_: string, id: string, seen: boolean) {
		return await this.stranerdClient.put<{ seen: boolean }, boolean>(`/notifications/${id}/seen`, { seen })
	}
}
