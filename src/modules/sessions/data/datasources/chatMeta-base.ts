import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatMetaFromModel } from '../models/chatMeta'

export abstract class ChatMetaBaseDataSource {
	abstract get: (query: QueryParams) => Promise<QueryResults<ChatMetaFromModel>>
	abstract listenToOne: (id: string, listener: Listeners<ChatMetaFromModel>) => Promise<() => void>
	abstract listenToMany: (listener: Listeners<ChatMetaFromModel>) => Promise<() => void>
}
