import * as functions from 'firebase-functions'
import { sendNewFormReportEmail } from '../../helpers/email'

export const reportCreated = functions.database.ref('forms/reports/{reportId}')
	.onCreate(async (snap) => {
		const { reportedId, reporterId, reportedBio, reporterBio, title, message, dates: { createdAt } } = snap.val()
		await sendNewFormReportEmail({
			id: snap.key, reportedId, reporterId, reportedBio, reporterBio, title, message,
			date: new Date(createdAt).toLocaleString()
		})
		await snap.ref.remove()
	})
