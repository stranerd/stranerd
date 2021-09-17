import Express from 'express'
import { setupRoutes } from './routes'
import { useApp, useBodyParser, useCORS } from './utils/setup'
import { RedirectMiddleware } from './controllers/redirect'
import { DecodeAuthUserMiddleware } from './controllers/auth'

const app = Express.Router()

useApp(app)
useBodyParser(app)
useCORS(app)

app.use(RedirectMiddleware)
app.get('*', DecodeAuthUserMiddleware)

app.use('/api', setupRoutes())

export default {
	path: '/',
	handler: app
}
