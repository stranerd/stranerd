import * as admin from 'firebase-admin'
import { createTransport } from 'nodemailer'
import * as Template from 'email-templates'
import { email, domain, logo, appName } from './environment'
import { Notification } from './modules/users/notifications'
import { TopUser } from './modules/users/rankings'
import { Message, Report } from './modules/forms'

export enum EMAILS {
	NOREPLY = 'no-reply@stranerd.com'
}

export const sendMail = async (to: string, subject: string, content: string, from = EMAILS.NOREPLY) => {
	const { clientId, privateKey } = email()

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

export const sendMailAndCatchErrors = async (to: string, subject: string, content: string, from = EMAILS.NOREPLY) => {
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

export const sendNewNotificationEmail = async (to: string, notification: Notification) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message: {} }).render('newNotification.pug',
		{ notification, meta })
	return await sendMailAndCatchErrors(to, notification.title, content, EMAILS.NOREPLY)
}

export const sendTopUsersEmail = async (period: string, users: TopUser[]) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message: {} }).render('topUsersEmail.pug',
		{ meta, period, users })
	return await sendMailAndCatchErrors('support@stranerd.com', `Top ${period} users`, content)
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
