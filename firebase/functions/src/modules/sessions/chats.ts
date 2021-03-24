import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
import { PATH_SEPARATOR } from '../../helpers'

export const personalChatsCreated = functions.database.ref('chats/single/{path}')
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

		await admin.database().ref('profiles')
			.update({
				[`${id1}/chats/${id2}`]: user2Ref.val(),
				[`${id2}/chats/${id1}`]: user1Ref.val()
			})
	})

export const personalChatMediaDeleted = functions.database.ref('chats/single/{path}/{chatId}/media')
	.onDelete(async (snap) => {
		await deleteFromStorage(snap.val()?.path)
	})
