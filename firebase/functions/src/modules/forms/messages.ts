import * as functions from 'firebase-functions'
import { sendNewFormMessageEmail } from '../../helpers/email'

export const messageCreated = functions.database.ref('forms/messages/{messageId}')
	.onCreate(async (snap) => {
		const { fName, lName, email, message, dates: { createdAt } } = snap.val()
		await sendNewFormMessageEmail({
			id: snap.key, fName, lName, email, message,
			date: new Date(createdAt).toLocaleString()
		})
		await snap.ref.remove()
	})
