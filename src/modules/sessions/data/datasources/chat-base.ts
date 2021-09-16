import { QueryParams, DatabaseGetClauses } from '@modules/core'
import { ChatFromModel, ChatMeta, ChatToModel } from '../models/chat'

export abstract class ChatBaseDataSource {
	abstract create: (data: ChatToModel) => Promise<string>
	abstract get: (query: QueryParams) => Promise<ChatFromModel[]>
	abstract getMeta: (query: QueryParams) => Promise<ChatMeta[]>
	abstract find: (id: string) => Promise<ChatFromModel | null>
	abstract listen: (callback: (documents: ChatFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract listenToMeta: (id: string, callback: (documents: ChatMeta[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	abstract markRead: (chatId: string, to: string) => Promise<void>
	abstract delete: (id: string) => Promise<void>
}
