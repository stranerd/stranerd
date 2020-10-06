import { Router } from 'express'
import { SigninController, SignoutController } from '../controllers/auth'

const router = Router()

router.post('/auth/signin', SigninController)
router.post('/auth/signout', SignoutController)

export { router }
