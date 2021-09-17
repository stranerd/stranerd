import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatFromModel, ChatMetaFromModel, ChatToModel } from '../models/chat'

export abstract class ChatBaseDataSource {
	abstract create: (path: [string, string], data: ChatToModel) => Promise<string>
	abstract get: (path: [string, string], query: QueryParams) => Promise<QueryResults<ChatFromModel>>
	abstract getMeta: (id: string, query: QueryParams) => Promise<QueryResults<ChatMetaFromModel>>
	abstract find: (path: [string, string], id: string) => Promise<ChatFromModel | null>
	abstract listen: (listener: Listeners<ChatFromModel>) => Promise<() => void>
	abstract listenToMeta: (id: string, listener: Listeners<ChatMetaFromModel>) => Promise<() => void>
	abstract markRead: (path: [string, string], chatId: string, to: string) => Promise<void>
}
