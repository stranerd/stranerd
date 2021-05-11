import { Router } from 'express'
import { SigninController, SignoutController } from '../controllers/auth'
import { EmailController } from '../controllers/email'

export const setupRoutes = () => {
	const router = Router()

	router.post('/auth/signin', SigninController)
	router.post('/auth/signout', SignoutController)
	router.post('/emails', EmailController)

	return router
}
