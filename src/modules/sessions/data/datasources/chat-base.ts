import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatFromModel, ChatToModel } from '../models/chat'

export abstract class ChatBaseDataSource {
	abstract create: (sessionId: string, data: ChatToModel) => Promise<string>
	abstract get: (sessionId: string, condition?: DatabaseGetClauses) => Promise<ChatFromModel[]>
	abstract find: (sessionId: string, id: string) => Promise<ChatFromModel | null>
	abstract listen: (sessionId: string, callback: (documents: ChatFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract update: (sessionId: string, id: string, data: Partial<ChatToModel>) => Promise<void>
	abstract delete: (sessionId: string, id: string) => Promise<void>
}
