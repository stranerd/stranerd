import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMetaBaseDataSource } from './chatMeta-base'

export class ChatMetaApiDataSource implements ChatMetaBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ChatMetaFromModel>>('/chatMetas', query)
	}

	async listenToOne (id: string, listener: Listeners<ChatMetaFromModel>) {
		return listenOnSocket(`chatMetas/${id}`, listener)
	}

	async listenToMany (listener: Listeners<ChatMetaFromModel>) {
		return listenOnSocket('chatMetas', listener)
	}
}
