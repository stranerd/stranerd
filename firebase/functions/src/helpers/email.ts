import * as admin from 'firebase-admin'
import * as googleapis from 'googleapis'
import { createTransport } from 'nodemailer'
import * as Template from 'email-templates'
import { email, domain, logo, appName } from './environment'
import { Notification } from './database/notifications'

enum EMAILS {
	NOREPLY = 'no-reply'
}

export const sendMail = async (to: string, subject: string ,content: string, from = EMAILS.NOREPLY) => {
	const { email: user, clientId, clientSecret, refreshToken } = email()[from]
	const oauth2Client = new googleapis.google.auth.OAuth2(clientId, clientSecret, 'https://developers.google.com/oauthplayground')
	oauth2Client.setCredentials({ refresh_token: refreshToken })
	const accessToken = (await oauth2Client.getAccessToken()).token!

	const transporter = createTransport({
		service: 'gmail',
		auth: { type: 'OAuth2', user, clientId, clientSecret, refreshToken, accessToken, },
		tls: { rejectUnauthorized: false, }
	})
	await transporter.sendMail({
		from: appName,
		to, subject,
		html: content
	})
}

export const sendMailAndCatchErrors = async (to: string, subject: string ,content: string, from = EMAILS.NOREPLY) => {
	try{
		await sendMail(to, subject, content, from)
		return true
	}catch(e){
		await admin.database().ref('errors/emails').push({
			error: e.message,
			subject, to, content,
			dates: { triedAt: admin.database.ServerValue.TIMESTAMP }
		})
		return false
	}
}

export const sendNewNotificationEmail = async (to: string, notification: Notification) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message:{} }).render('newNotification.pug',
		{ notification, meta })
	return await sendMailAndCatchErrors(to, notification.title, content, EMAILS.NOREPLY)
}

export const sendSessionRequestEmail = async (to: string, student: any, time: string) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message:{} }).render('sessionRequestEmail.pug',
		{ student, meta, time })
	return await sendMailAndCatchErrors(to, 'Session Request', content)
}

export const sendTopUsersEmail = async (period: string, users: { email: string, name: string, id: string, credits: number }[]) => {
	const meta = { domain: domain(), logo: logo() }
	const content = await new Template({ message:{} }).render('topUsersEmail.pug',
		{ meta, period, users })
	return await sendMailAndCatchErrors('support@stranerd.com', `Top ${period} users`, content)
}
