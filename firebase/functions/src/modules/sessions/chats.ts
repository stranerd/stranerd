import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
import { PATH_SEPARATOR } from '../../helpers'
import { defaultConfig } from '../../helpers/functions'

export const personalChatsCreated = functions.runWith(defaultConfig).database.ref('chats/single/{path}')
	.onCreate(async (snap) => {
		const [id1, id2] = snap.key.split(PATH_SEPARATOR)
		const user1Ref = await admin.database().ref('profiles')
			.child(id1)
			.child('bio')
			.once('value')
		const user2Ref = await admin.database().ref('profiles')
			.child(id2)
			.child('bio')
			.once('value')

		await admin.database().ref('chats/meta')
			.update({
				[`${id1}/${id2}/bio`]: user2Ref.val(),
				[`${id2}/${id1}/bio`]: user1Ref.val()
			})
	})

export const personalChatMediaDeleted = functions.runWith(defaultConfig).database.ref('chats/single/{path}/{chatId}/media')
	.onDelete(async (snap) => {
		await deleteFromStorage(snap.val()?.path)
	})
