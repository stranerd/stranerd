import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { NotificationEntity } from '../entities/notification'
import { NotificationToModel } from '../../data/models/notification'

export interface INotificationRepository {
	add: (userId: string, data: NotificationToModel) => Promise<string>,
	find: (userId: string, id: string) => Promise<NotificationEntity | null>
	get: (userId: string, conditions?: DatabaseGetClauses) => Promise<NotificationEntity[]>
	listen: (userId: string, callback: (entities: NotificationEntity[]) => void, conditions?: DatabaseGetClauses) => Promise<() => void>
	update: (userId: string, id: string, data: Partial<NotificationToModel>) => Promise<string>,
	delete: (userId: string, id: string) => Promise<void>
}
