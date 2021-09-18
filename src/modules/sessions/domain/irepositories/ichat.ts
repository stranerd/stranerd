import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (path: [string, string], data: ChatToModel) => Promise<string>,
	get: (path: [string, string], query: QueryParams) => Promise<QueryResults<ChatEntity>>
	find: (path: [string, string], id: string) => Promise<ChatEntity | null>
	listenToOne: (id: string, listener: Listeners<ChatEntity>) => Promise<() => void>
	listenToMany: (listener: Listeners<ChatEntity>) => Promise<() => void>
	markRead: (path: [string, string], chatId: string, to: string) => Promise<void>
}
