import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { NotificationFromModel } from '../models/notification'

export abstract class NotificationBaseDataSource {
	abstract get: (user: string, query: QueryParams) => Promise<QueryResults<NotificationFromModel>>
	abstract listenToMany: (user: string, listener: Listeners<NotificationFromModel>) => Promise<() => void>
	abstract listenToOne: (user: string, id: string, listener: Listeners<NotificationFromModel>) => Promise<() => void>
	abstract find: (user: string, id: string) => Promise<NotificationFromModel | null>
	abstract markSeen: (userId: string, id: string, seen: boolean) => Promise<boolean>
}
