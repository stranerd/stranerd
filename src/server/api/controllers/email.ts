import { Request, Response } from 'express'
import { sendAuthEmail } from '../utils/emails'
import { getFirebaseAdmin } from '../utils/firebase'

export const EmailController = async (req: Request, res: Response) => {
	try {
		const { email, redirectUrl } = req.body
		if (!email) return res.status(400).json({
			success: false,
			error: 'Email is required'
		}).end()
		if (!redirectUrl) return res.status(400).json({
			success: false,
			error: 'Redirect URL is required'
		}).end()

		const link = await getFirebaseAdmin().auth().generateSignInWithEmailLink(email, {
			url: redirectUrl,
			handleCodeInApp: true
		})
		await sendAuthEmail(email, link)

		return res.json({
			success: true,
			error: null
		}).end()
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: 'Failed to send email'
		}).end()
	}
}
