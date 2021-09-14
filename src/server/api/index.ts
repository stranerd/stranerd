import Express from 'express'
import { setupRoutes } from './routes'
import { useApp, useBodyParser, useCORS } from './utils/setup'
import { DecodeAuthUserMiddleware } from './controllers/auth'
import { RedirectMiddleware } from './controllers/redirect'

const app = Express.Router()

useApp(app)
useBodyParser(app)
useCORS(app)

app.use(RedirectMiddleware)
app.use(DecodeAuthUserMiddleware)

app.use('/api', setupRoutes())

export default {
	path: '/',
	handler: app
}
