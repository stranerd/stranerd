import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { MessageEntity } from '../entities/message'
import { MessageToModel } from '../../data/models/message'

export interface IMessageRepository {
	add: (data: MessageToModel) => Promise<string>,
	find: (id: string) => Promise<MessageEntity | undefined>
	get: (conditions?: DatabaseGetClauses) => Promise<MessageEntity[]>
	update: (id: string, data: MessageToModel) => Promise<void>,
	delete: (id: string) => Promise<void>
}
