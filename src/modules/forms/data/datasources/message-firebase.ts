import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { MessageFromModel, MessageToModel } from '../models/message'
import { FormBaseDataSource } from './form-base'

export class MessageFirebaseDataSource implements FormBaseDataSource<MessageFromModel, MessageToModel> {
	async create (message: MessageToModel) {
		return await DatabaseService.create<MessageToModel>('forms/messages', message)
	}

	async find (id: string) {
		return await DatabaseService.get<MessageFromModel>(`forms/messages/${id}`)
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<MessageFromModel>('forms/messages', conditions)
	}

	async update (id: string, data: MessageToModel) {
		return await DatabaseService.update<MessageToModel>(`forms/messages/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`forms/messages/${id}`)
	}
}
