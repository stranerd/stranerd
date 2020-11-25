import * as functions from 'firebase-functions'
import { deleteFromStorage } from '../../helpers/storage'

export const sessionChatMediaDeleted = functions.database.ref('sessions/{sessionId}/chats/{chatId}/media')
	.onDelete(async (snap) => {
		await deleteFromStorage(snap.val()?.path)
	})
