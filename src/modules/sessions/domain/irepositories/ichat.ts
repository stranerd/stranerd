import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (path: string, data: ChatToModel) => Promise<string>,
	get: (path:string, conditions?: DatabaseGetClauses) => Promise<ChatEntity[]>
	find: (path:string, id: string) => Promise<ChatEntity | null>
	listen: (path: string, callback: (entities: ChatEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	update: (path:string, id: string, data: Partial<ChatToModel>) => Promise<void>
	delete: (path:string, id: string) => Promise<void>
}
