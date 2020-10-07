import Express from 'express'
// @ts-ignore
import subdomain from 'express-subdomain'
import { setupRoutes } from './routes'
import { useApp, useBodyParser, useCORS } from './utils/setup'

const app = Express.Router()

useApp(app)
useBodyParser(app)
useCORS(app)
app.use(subdomain('api', setupRoutes()))

export default {
	path: '/',
	handler: app
}
