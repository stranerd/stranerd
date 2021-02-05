import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class SessionChatFirebaseDataSource implements ChatBaseDataSource {
	public async create (sessionId: string, data: ChatToModel) {
		return await DatabaseService.create(`sessions/${sessionId}/chats`, data)
	}

	public async get (sessionId: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany(`sessions/${sessionId}/chats`, conditions) as ChatFromModel[]
	}

	public async find (sessionId: string, id: string) {
		return await DatabaseService.get(`sessions/${sessionId}/chats/${id}`) as ChatFromModel | null
	}

	public async listen (sessionId: string, callback: (documents: ChatFromModel[]) => void, conditions?: DatabaseGetClauses): Promise<() => void> {
		return await DatabaseService.listenToMany(`sessions/${sessionId}/chats`, callback, conditions)
	}

	public async update (sessionId: string, id: string, data: Partial<ChatToModel>) {
		return await DatabaseService.update(`sessions/${sessionId}/chats/${id}`, data)
	}

	public async delete (sessionId: string, id: string) {
		return await DatabaseService.delete(`sessions/${sessionId}/chats/${id}`)
	}
}
