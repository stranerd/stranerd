import { DatabaseService } from '@modules/core/services/firebase'
import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import firebase from '@modules/core/services/initFirebase'
import { getRandomValue } from '@utils/commons'
import { getChatsPath } from '@utils/constants'
import { ChatFromModel, ChatMeta, ChatToModel } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class PersonalChatFirebaseDataSource implements ChatBaseDataSource {
	public async create (path: [string, string], data: ChatToModel) {
		const id = Date.now() + getRandomValue()
		// @ts-ignore
		data.dates = { createdAt: firebase.database.ServerValue.TIMESTAMP }
		await DatabaseService.update('chats', {
			[`single/${getChatsPath(path)}/${id}`]: data,
			[`meta/${path[0]}/${path[1]}/last`]: data,
			[`meta/${path[0]}/${path[1]}/unRead/${id}`]: true
		})
		return id
	}

	public async get (path: [string, string], conditions?: DatabaseGetClauses) {
		return await DatabaseService.getMany(`chats/single/${getChatsPath(path)}`, conditions) as ChatFromModel[]
	}

	public async getMeta (id: string) {
		return await DatabaseService.getMany(`chats/meta/${id}`) as ChatMeta[]
	}

	public async find (path: [string, string], id: string) {
		return await DatabaseService.get(`chats/single/${path}/${id}`) as ChatFromModel | null
	}

	public async listen (path: [string, string], callback: (documents: ChatFromModel[]) => void, conditions?: DatabaseGetClauses): Promise<() => void> {
		return await DatabaseService.listenToMany(`chats/single/${getChatsPath(path)}`, callback, conditions)
	}

	public async listenToMeta (id: string, callback: (documents: ChatMeta[]) => void): Promise<() => void> {
		return await DatabaseService.listenToMany(`chats/meta/${id}`, callback)
	}

	public async markRead (path: [string, string], id: string) {
		return await DatabaseService.update('chats', {
			[`single/${getChatsPath(path)}/${id}/readAt`]: firebase.database.ServerValue.TIMESTAMP,
			[`meta/${path[0]}/${path[1]}/unRead/${id}`]: null
		})
	}

	public async delete (path: [string, string], id: string) {
		return await DatabaseService.delete(`chats/single/${getChatsPath(path)}/${id}`)
	}
}
