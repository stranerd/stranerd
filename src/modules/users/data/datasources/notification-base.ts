import { DatabaseGetClauses } from '@modules/core'
import { NotificationFromModel, NotificationToModel } from '../models/notification'

export abstract class NotificationBaseDataSource {
	abstract create: (user: string, data: NotificationToModel) => Promise<string>
	abstract get: (user: string, condition?: DatabaseGetClauses) => Promise<NotificationFromModel[]>
	abstract listen: (user: string, callback: (documents: NotificationFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
	abstract find: (user: string, id: string) => Promise<NotificationFromModel | null>
	abstract update: (user: string, id: string, data: Partial<NotificationToModel>) => Promise<string>
	abstract delete: (user: string, id: string) => Promise<void>
}
