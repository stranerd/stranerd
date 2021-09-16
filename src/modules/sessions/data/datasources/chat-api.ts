import { HttpClient, DatabaseService, QueryParams, DatabaseGetClauses } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { ChatToModel, ChatFromModel, ChatMeta } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class ChatDataSource implements ChatBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async create (chat: ChatToModel) {
	  return await this.stranerdClient.post<any, any>('/chats', chat)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, any>(`/chats/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/chats', query)
	}

	async getMeta (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, any>('/chatMeta', query)
	}

	public async listen (callback: (documents: ChatFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ChatFromModel>('chats/single/', callback, conditions)
	}

	public async listenToMeta (id: string, callback: (documents: ChatMeta[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ChatMeta>(`chats/meta/${id}`, callback, conditions)
	}

	async markRead (chatId: string, to: string) {
		return await this.stranerdClient.put<any, any>('/chats/read', { chatId, to })
	}

	async delete (id: string) {
		return await this.stranerdClient.delete<any, any>(`/chats/${id}`, {})
	}
}
