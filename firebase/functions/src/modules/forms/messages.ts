import * as functions from 'firebase-functions'
import { sendNewFormMessageEmail } from '../../helpers/email'

export const messageCreated = functions.database.ref('forms/messages/{messageId}')
	.onCreate(async (snap) => {
		const { name, email, message, dates: { createdAt } } = snap.val()
		await sendNewFormMessageEmail({
			name, email, message,
			date: new Date(createdAt).toLocaleString()
		})
		await snap.ref.remove()
	})
