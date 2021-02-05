import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class PersonalChatFirebaseDataSource implements ChatBaseDataSource {
	public async create (path: string, data: ChatToModel) {
		return await DatabaseService.create(`chats/single/${path}`, data)
	}

	public async get (path: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany(`chats/single/${path}`, conditions) as ChatFromModel[]
	}

	public async find (path: string, id: string) {
		return await DatabaseService.get(`chats/single/${path}/${id}`) as ChatFromModel | null
	}

	public async listen (path: string, callback: (documents: ChatFromModel[]) => void, conditions?: DatabaseGetClauses): Promise<() => void> {
		return await DatabaseService.listenToMany(`chats/single/${path}`, callback, conditions)
	}

	public async update (path: string, id: string, data: Partial<ChatToModel>) {
		return await DatabaseService.update(`chats/single/${path}/${id}`, data)
	}

	public async delete (path: string, id: string) {
		return await DatabaseService.delete(`chats/single/${path}/${id}`)
	}
}
