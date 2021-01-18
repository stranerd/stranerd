import * as functions from 'firebase-functions'
import { deleteFromAlgolia, saveToAlgolia } from '../../helpers/algolia'
import { createNotification, NotificationType } from '../../helpers/modules/notifications'

export const tutorCreated = functions.firestore.document('tutors/{id}')
	.onCreate(async(snap, context) => {
		const data = snap.data()
		const { id } = context.params

		await saveToAlgolia('tutors', id, data)

		await createNotification(id, {
			title: 'Tutor Privileges Modified',
			type: NotificationType.INFO,
			action: '/account',
			description: 'Your account has successfully being granted tutoring privileges'
		})
	})

export const tutorUpdated = functions.firestore.document('tutors/{id}')
	.onUpdate(async(snap, context) => {
		const data = snap.after.data()
		const { id } = context.params

		await saveToAlgolia('tutors', id, data)
	})

export const tutorDeleted = functions.firestore.document('tutors/{id}')
	.onDelete(async(_, context) => {
		const { id } = context.params

		await deleteFromAlgolia('tutors', id)

		await createNotification(id, {
			title: 'Tutor Privileges Modified',
			type: NotificationType.INFO,
			action: '/account',
			description: 'Your tutoring privileges has been removed. Contact an admin if this was a mistake'
		})
	})
