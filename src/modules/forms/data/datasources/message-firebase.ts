import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { MessageFromModel, MessageToModel } from '../models/message'
import { FormBaseDataSource } from './form-base'

export class MessageFirebaseDataSource implements FormBaseDataSource<MessageFromModel, MessageToModel> {
	async create (message: MessageToModel) {
		return await DatabaseService.create('forms/messages', message)
	}

	async find (id: string) {
		return await DatabaseService.get(`forms/messages/${id}`) as MessageFromModel | null
	}

	async get (conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany('forms/messages', conditions) as MessageFromModel[]
	}

	async update (id: string, data: MessageToModel) {
		return await DatabaseService.update(`forms/messages/${id}`, data)
	}

	async delete (id: string) {
		return await DatabaseService.delete(`forms/messages/${id}`)
	}
}
