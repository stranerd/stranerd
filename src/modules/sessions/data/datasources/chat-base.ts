import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatFromModel, ChatToModel } from '../models/chat'

export abstract class ChatBaseDataSource {
	abstract create: (path: string, data: ChatToModel) => Promise<string>
	abstract get: (path: string, condition?: DatabaseGetClauses) => Promise<ChatFromModel[]>
	abstract find: (path: string, id: string) => Promise<ChatFromModel | null>
	abstract listen: (path: string, callback: (documents: ChatFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract update: (path: string, id: string, data: Partial<ChatToModel>) => Promise<void>
	abstract delete: (path: string, id: string) => Promise<void>
}
