import { DatabaseService, firebase, DatabaseGetClauses } from '@modules/core'
import { getRandomValue } from '@utils/commons'
import { getChatsPath } from '@utils/constants'
import { ChatFromModel, ChatMeta, ChatToModel } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class PersonalChatFirebaseDataSource implements ChatBaseDataSource {
	public async create (path: [string, string], data: ChatToModel) {
		const id = getRandomValue()
		// @ts-ignore
		data.dates = { createdAt: firebase.database.ServerValue.TIMESTAMP }
		await DatabaseService.update('chats', {
			[`single/${getChatsPath(path)}/${id}`]: data,
			[`meta/${path[0]}/${path[1]}/last`]: { ...data, id },
			[`meta/${path[1]}/${path[0]}/last`]: { ...data, id },
			[`meta/${path[1]}/${path[0]}/unRead/${id}`]: true
		})
		return id
	}

	public async get (path: [string, string], conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<ChatFromModel>(`chats/single/${getChatsPath(path)}`, conditions)
	}

	public async getMeta (id: string, conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany<ChatMeta>(`chats/meta/${id}`, conditions)
	}

	public async find (path: [string, string], id: string) {
		return await DatabaseService.get<ChatFromModel>(`chats/single/${path}/${id}`)
	}

	public async listen (path: [string, string], callback: (documents: ChatFromModel[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ChatFromModel>(`chats/single/${getChatsPath(path)}`, callback, conditions)
	}

	public async listenToMeta (id: string, callback: (documents: ChatMeta[]) => void, conditions?: DatabaseGetClauses) {
		return await DatabaseService.listenToMany<ChatMeta>(`chats/meta/${id}`, callback, conditions)
	}

	public async markRead (path: [string, string], id: string) {
		return await DatabaseService.update('chats', {
			[`meta/${path[0]}/${path[1]}/unRead/${id}`]: null,
			[`single/${getChatsPath(path)}/${id}/readAt`]: firebase.database.ServerValue.TIMESTAMP
		})
	}

	public async delete (path: [string, string], id: string) {
		return await DatabaseService.delete(`chats/single/${getChatsPath(path)}/${id}`)
	}
}
