import * as functions from 'firebase-functions'
import { deleteFromAlgolia, saveToAlgolia } from '../helpers/algolia'

export const tutorUpdated = functions.database.ref('tutors/{id}').onWrite(async(snap, context) => {
	const data = snap.after.val()
	if (data) await saveToAlgolia('tutors', context.params.id, snap.after.val())
	else await deleteFromAlgolia('tutors', context.params.id)
})
