import { Router } from 'express'
import { SigninController, SignoutController, ImportUsersController, ExportUsersController } from '../controllers/auth'
import { isDev } from '../../../utils/environment'

export const setupRoutes = () => {
	const router = Router()

	router.post('/auth/signin', SigninController)
	router.post('/auth/signout', SignoutController)

	if (isDev) {
		router.post('/auth/import', ImportUsersController)
		router.post('/auth/export', ExportUsersController)
	}

	return router
}
