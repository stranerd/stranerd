import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatMetaEntity } from '../entities/chatMeta'

export interface IChatMetaRepository {
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	listenToOne: (id: string, listeners: Listeners<ChatMetaEntity>) => Promise<() => void>
	listenToMany: (listeners: Listeners<ChatMetaEntity>) => Promise<() => void>
}
