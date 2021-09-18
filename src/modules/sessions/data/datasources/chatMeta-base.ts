import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatMetaFromModel } from '../models/chatMeta'

export interface ChatMetaBaseDataSource {
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaFromModel>>
	listenToOne: (id: string, listener: Listeners<ChatMetaFromModel>) => Promise<() => void>
	listenToMany: (listener: Listeners<ChatMetaFromModel>) => Promise<() => void>
}
