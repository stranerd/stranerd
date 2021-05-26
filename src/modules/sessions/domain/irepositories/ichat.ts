import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (path: [string, string], data: ChatToModel) => Promise<string>,
	get: (path:[string, string], conditions?: DatabaseGetClauses) => Promise<ChatEntity[]>
	find: (path:[string, string], id: string) => Promise<ChatEntity | null>
	listen: (path: [string, string], callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	markRead: (path:[string, string], id: string) => Promise<void>
	delete: (path:[string, string], id: string) => Promise<void>
}
