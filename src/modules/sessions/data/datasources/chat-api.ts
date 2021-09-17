import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ChatFromModel, ChatMetaFromModel, ChatToModel } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class ChatApiDataSource implements ChatBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (_: [string, string], data: ChatToModel) {
		const chat = await this.stranerdClient.post<ChatToModel, ChatFromModel>('/chats', data)
		return chat.id
	}

	async find (_: [string, string], id: string) {
		return await this.stranerdClient.get<{}, ChatFromModel>(`/chats/${id}`, {})
	}

	async get (_: [string, string], query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ChatFromModel>>('/chats', query)
	}

	async getMeta (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ChatMetaFromModel>>('/chatMeta', query)
	}

	async listen (listener: Listeners<ChatFromModel>) {
		return listenOnSocket('chats/single/', listener)
	}

	async listenToMeta (id: string, listener: Listeners<ChatMetaFromModel>) {
		return listenOnSocket(`chats/meta/${id}`, listener)
	}

	async markRead (_: [string, string], chatId: string, to: string) {
		return await this.stranerdClient.put<any, any>('/chats/read', { chatId, to })
	}
}
