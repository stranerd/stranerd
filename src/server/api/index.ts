import Express from 'express'
import { setupRoutes } from './routes'
import { useApp, useBodyParser, useCORS } from './utils/setup'
import { DecodeSessionCookieMiddleware } from './controllers/auth'

const app = Express.Router()

useApp(app)
useBodyParser(app)
useCORS(app)

app.use(DecodeSessionCookieMiddleware)

app.use('/api', setupRoutes())

export default {
	path: '/',
	handler: app
}
