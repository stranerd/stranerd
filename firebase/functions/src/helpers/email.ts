import * as admin from 'firebase-admin'
import { createTransport } from 'nodemailer'
import * as Template from 'email-templates'
import { appName, domain, email, EMAILS, logo } from './environment'
import { EmailNotification } from './modules/users/notifications'
import { Message, Report } from './modules/forms'

export const sendMail = async (to: string, subject: string, content: string, from = EMAILS.NO_REPLY) => {
	const { clientId, privateKey } = email()[from]

	const transporter = createTransport({
		service: 'gmail',
		auth: { type: 'OAuth2', user: from, serviceClient: clientId, privateKey },
		tls: { rejectUnauthorized: false }
	})
	await transporter.verify()
	await transporter.sendMail({
		from: appName,
		to, subject,
		html: content
	})
}

export const sendMailAndCatchErrors = async (to: string, subject: string, content: string, from = EMAILS.NO_REPLY) => {
	try {
		await sendMail(to, subject, content, from)
		return true
	} catch (e) {
		await admin.database().ref('errors/emails').push({
			error: e.message,
			subject, to, content, from,
			dates: { triedAt: admin.database.ServerValue.TIMESTAMP }
		})
		return false
	}
}

export const sendNewNotificationEmail = async (to: string, notification: EmailNotification) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message: {} }).render('newNotification.pug',
		{ notification, meta })
	return await sendMailAndCatchErrors(to, notification.title, content, EMAILS.NO_REPLY)
}

export const sendNewFormMessageEmail = async (message: Message) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message: {} }).render('newFormMessage.pug',
		{ meta, message })
	return await sendMailAndCatchErrors('support@stranerd.com', 'New Message', content)
}

export const sendNewFormReportEmail = async (report: Report) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message: {} }).render('newFormReport.pug',
		{ meta, report })
	return await sendMailAndCatchErrors('support@stranerd.com', 'New Report', content)
}
