import * as functions from 'firebase-functions'
import { sendNewFormMessageEmail } from '../../helpers/email'
import { defaultConfig } from '../../helpers/functions'

export const messageCreated = functions.runWith(defaultConfig).database.ref('forms/messages/{messageId}')
	.onCreate(async (snap) => {
		const { fName, lName, email, message, dates: { createdAt } } = snap.val()
		await sendNewFormMessageEmail({
			id: snap.key, fName, lName, email, message,
			date: new Date(createdAt).toLocaleString()
		})
		await snap.ref.remove()
	})
