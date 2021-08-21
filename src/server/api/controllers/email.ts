import { Request, Response } from 'express'
import { sendPasswordResetEmail, sendSigninEmail, sendVerificationEmail } from '../utils/emails'
import { getFirebaseAdmin } from '../utils/firebase'

export const SignInEmailController = async (req: Request, res: Response) => {
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
		await sendSigninEmail(email, link)

		return res.json({
			success: true,
			error: null
		}).end()
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: 'Failed to send signin email'
		}).end()
	}
}

export const VerifyEmailController = async (req: Request, res: Response) => {
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

		const link = await getFirebaseAdmin().auth().generateEmailVerificationLink(email, {
			url: redirectUrl,
			handleCodeInApp: true
		})
		await sendVerificationEmail(email, link)

		return res.json({
			success: true,
			error: null
		}).end()
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: 'Failed to send verification email'
		}).end()
	}
}

export const PasswordResetController = async (req: Request, res: Response) => {
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

		const link = await getFirebaseAdmin().auth().generatePasswordResetLink(email, {
			url: redirectUrl,
			handleCodeInApp: true
		})
		await sendPasswordResetEmail(email, link)

		return res.json({
			success: true,
			error: null
		}).end()
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: 'Failed to send password reset email'
		}).end()
	}
}
