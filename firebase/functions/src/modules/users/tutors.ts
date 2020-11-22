import * as functions from 'firebase-functions'
import { deleteFromAlgolia, saveToAlgolia } from '../../helpers/algolia'

export const tutorUpdated = functions.firestore.document('tutors/{id}').onWrite(async(snap, context) => {
	const data = snap.after.data()
	if (data) await saveToAlgolia('tutors', context.params.id, data)
	else await deleteFromAlgolia('tutors', context.params.id)
})
