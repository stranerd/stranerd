import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'
import { ChatMetaEntity } from '../entities/chatMeta'

export interface IChatRepository {
	add: (path: [string, string], data: ChatToModel) => Promise<string>,
	get: (path: [string, string], query: QueryParams) => Promise<QueryResults<ChatEntity>>
	getMeta: (id: string, query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	find: (path: [string, string], id: string) => Promise<ChatEntity | null>
	listen: (path: [string, string], callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	listenToMeta: (id: string, callback: (entities: ChatMetaEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	markRead: (path: [string, string], chatId: string, to: string) => Promise<void>
}
