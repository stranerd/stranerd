import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { sendMail, EMAILS } from '../helpers/email'

type EmailError = { subject: string, to: string, content: string, from: EMAILS }

export const resendEmails = functions.https.onRequest(async (_, res) => {
	const ref = await admin.database().ref('errors/emails').once('value')
	const emails = Object.entries((ref.val() ?? {}) as Record<string, EmailError>)
		.map(([id, data]) => ({ ...data, id }))

	const result = await Promise.all(
		emails.map(async ({ subject, to, content, id, from }) => {
			const ref = admin.database().ref('errors/emails').child(id)
			try {
				await sendMail(to, subject, content, from)
				await ref.remove()
				return true
			} catch (e) {
				await ref.update({
					'dates/triedAt': admin.database.ServerValue.TIMESTAMP,
					error: e.message
				})
				return false
			}
		})
	)

	const tried = result.length
	const succeeded = result.filter((r) => r).length
	const failed = tried - succeeded

	res.json({ tried, succeeded, failed })
})
