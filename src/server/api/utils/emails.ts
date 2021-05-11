import { createTransport } from 'nodemailer'
import { appName, email, EMAILS } from '../../../utils/environment'

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
