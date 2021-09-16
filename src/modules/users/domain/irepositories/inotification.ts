import { DatabaseGetClauses, QueryParams, QueryResults } from '@modules/core'
import { NotificationEntity } from '../entities/notification'

export interface INotificationRepository {
	find: (userId: string, id: string) => Promise<NotificationEntity | null>
	get: (userId: string, query: QueryParams) => Promise<QueryResults<NotificationEntity>>
	listen: (userId: string, callback: (entities: NotificationEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	markSeen: (userId: string, id: string, seen: boolean) => Promise<boolean>,
}
