import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatFromModel, ChatToModel } from '../models/chat'

export interface ChatBaseDataSource {
	create: (path: [string, string], data: ChatToModel) => Promise<string>
	get: (path: [string, string], query: QueryParams) => Promise<QueryResults<ChatFromModel>>
	find: (path: [string, string], id: string) => Promise<ChatFromModel | null>
	listenToMany: (listener: Listeners<ChatFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<ChatFromModel>) => Promise<() => void>
	markRead: (path: [string, string], chatId: string, to: string) => Promise<void>
}
