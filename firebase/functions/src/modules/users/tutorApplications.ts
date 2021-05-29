import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'

export const tutorApplicationCreated = functions.firestore.document('tutorApplications/{id}')
	.onCreate(async (snap) => {
		const { userId } = snap.data()
		await admin.database().ref('profiles').child(userId)
			.child('meta/tutorApplications').child(snap.id)
			.set(true)
	})

export const tutorApplicationDeleted = functions.firestore.document('tutorApplications/{id}')
	.onDelete(async (snap) => {
		const { userId } = snap.data()
		await admin.database().ref('profiles').child(userId)
			.child('meta/tutorApplications').child(snap.id)
			.set(null)
		await deleteFromStorage(snap.data().proof?.path)
	})
