import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatFromModel, ChatMeta, ChatToModel } from '../models/chat'

export abstract class ChatBaseDataSource {
	abstract create: (path: [string, string], data: ChatToModel) => Promise<string>
	abstract get: (path: [string, string], condition?: DatabaseGetClauses) => Promise<ChatFromModel[]>
	abstract getMeta: (id: string) => Promise<ChatMeta[]>
	abstract find: (path: [string, string], id: string) => Promise<ChatFromModel | null>
	abstract listen: (path: [string, string], callback: (documents: ChatFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract listenToMeta: (id: string, callback: (documents: ChatMeta[]) => void) => Promise<() => void>
	abstract markRead: (path: [string, string], id: string) => Promise<void>
	abstract delete: (path: [string, string], id: string) => Promise<void>
}
