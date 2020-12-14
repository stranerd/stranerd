import * as functions from 'firebase-functions'
import { deleteFromStorage } from '../../helpers/storage'

export const subjectUpdated = functions.firestore.document('subjects/{subjectId}')
	.onUpdate(async (snap) => {
		const before = snap.before.data()
		const after = snap.after.data()
		if (before.icon?.path !== after.icon?.path)
			await deleteFromStorage(before.icon?.path)
	})

export const subjectDeleted = functions.firestore.document('subjects/{subjectId}')
	.onDelete(async (snap) => {
		await deleteFromStorage(snap.data().icon?.path)
	})
