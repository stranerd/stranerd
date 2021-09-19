import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMetaBaseDataSource } from './chatMeta-base'

export class ChatMetaApiDataSource implements ChatMetaBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, ChatMetaFromModel | null>(`/chatMetas/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ChatMetaFromModel>>('/chatMetas', query)
	}

	async listenToOne (id: string, listeners: Listeners<ChatMetaFromModel>) {
		const listener = listenOnSocket(`chatMetas/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ChatMetaFromModel>) {
		const listener = listenOnSocket('chatMetas', listeners)
		query.all = true
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
