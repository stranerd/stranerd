import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatFromModel, ChatToModel } from '../models/chat'

export abstract class ChatBaseDataSource {
	abstract create: (path: [string, string], data: ChatToModel) => Promise<string>
	abstract get: (path: [string, string], query: QueryParams) => Promise<QueryResults<ChatFromModel>>
	abstract find: (path: [string, string], id: string) => Promise<ChatFromModel | null>
	abstract listenToMany: (listener: Listeners<ChatFromModel>) => Promise<() => void>
	abstract listenToOne: (id: string, listener: Listeners<ChatFromModel>) => Promise<() => void>
	abstract markRead: (path: [string, string], chatId: string, to: string) => Promise<void>
}
