import { DatabaseService } from '@modules/core'
import { MessageToModel } from '../models/message'
import { FormBaseDataSource } from './form-base'

export class MessageFirebaseDataSource implements FormBaseDataSource<MessageToModel> {
	async create (message: MessageToModel) {
		return await DatabaseService.create<MessageToModel>('forms/messages', message)
	}
}
