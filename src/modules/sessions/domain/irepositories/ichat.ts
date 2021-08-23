import { DatabaseGetClauses } from '@modules/core'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'
import { ChatMetaEntity } from '../entities/chatMeta'

export interface IChatRepository {
	add: (path: [string, string], data: ChatToModel) => Promise<string>,
	get: (path: [string, string], conditions?: DatabaseGetClauses) => Promise<ChatEntity[]>
	getMeta: (id: string, conditions?: DatabaseGetClauses) => Promise<ChatMetaEntity[]>
	find: (path: [string, string], id: string) => Promise<ChatEntity | null>
	listen: (path: [string, string], callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	listenToMeta: (id: string, callback: (entities: ChatMetaEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	markRead: (path: [string, string], id: string) => Promise<void>
	delete: (path: [string, string], id: string) => Promise<void>
}
