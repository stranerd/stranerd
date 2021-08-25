import { createTransport } from 'nodemailer'
import Template from 'email-templates'
import { appName, domain, email, EMAILS, logo } from '../../../utils/environment'

export const sendMail = async (to: string, subject: string, content: string, from = EMAILS.NO_REPLY) => {
	const { clientId, privateKey } = email[from]

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

export const sendSigninEmail = async (email: string, link: string) => {
	const content = await new Template({ message: {} }).render('signin.pug',
		{ meta: { domain, logo }, link })
	await sendMail(email, `Signin To ${appName}`, content)
}

export const sendVerificationEmail = async (email: string, link: string) => {
	const content = await new Template({ message: {} }).render('verify.pug',
		{ meta: { domain, logo }, link })
	await sendMail(email, 'Verify Your Email', content)
}

export const sendPasswordResetEmail = async (email: string, link: string) => {
	const content = await new Template({ message: {} }).render('password.pug',
		{ meta: { domain, logo }, link })
	await sendMail(email, 'Reset Your Password', content)
}
