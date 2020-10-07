import { Router } from 'express'
import { SigninController, SignoutController } from '../controllers/auth'

export const setupRoutes = () => {
	const router = Router()

	router.post('/auth/signin', SigninController)
	router.post('/auth/signout', SignoutController)

	return router
}
