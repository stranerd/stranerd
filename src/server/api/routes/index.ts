import { Router } from 'express'
import { SigninController, SignoutController } from '../controllers/auth'
import { PasswordResetController, SignInEmailController, VerifyEmailController } from '../controllers/email'

export const setupRoutes = () => {
	const router = Router()

	router.post('/auth/signin', SigninController)
	router.post('/auth/signout', SignoutController)
	router.post('/auth/emails/signin', SignInEmailController)
	router.post('/auth/emails/verify', VerifyEmailController)
	router.post('/auth/emails/password-reset', PasswordResetController)

	return router
}
