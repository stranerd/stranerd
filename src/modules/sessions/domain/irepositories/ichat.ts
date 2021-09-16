import { DatabaseGetClauses, QueryParams } from '@modules/core'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'
import { ChatMetaEntity } from '../entities/chatMeta'

export interface IChatRepository {
	add: (data: ChatToModel) => Promise<string>,
	get: (query: QueryParams) => Promise<ChatEntity[]>
	getMeta: (query: QueryParams) => Promise<ChatMetaEntity[]>
	find: (id: string) => Promise<ChatEntity | null>
	listen: (callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	listenToMeta: (id: string, callback: (entities: ChatMetaEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	markRead: (chatId: string, to: string) => Promise<void>
	delete: (id: string) => Promise<void>
}
