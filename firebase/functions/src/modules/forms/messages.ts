import * as functions from 'firebase-functions'

export const messageCreated = functions.database.ref('forms/messages/{messageId}')
	.onCreate((snap) => {
		const { name, email, message, dates: { createdAt } } = snap.val()
		console.log(name)
		console.log(email)
		console.log(message)
		console.log(createdAt)
	})
