import * as functions from 'firebase-functions'
import { deleteFromStorage } from '../../helpers/storage'

export const subjectDeleted = functions.database.ref('subjects/{subjectId}').onDelete(async (snap) => {
	await deleteFromStorage(snap.val().icon?.path)
})
