import Express from 'express'
// @ts-ignore
import subdomain from 'express-subdomain'
import { useSubdomain } from '../../utils/environment'
import { setupRoutes } from './routes'
import { useApp, useBodyParser, useCORS } from './utils/setup'

const app = Express.Router()

useApp(app)
useBodyParser(app)
useCORS(app)

if (useSubdomain) app.use(subdomain('api', setupRoutes()))
else app.use('/api', setupRoutes())

export default {
	path: '/',
	handler: app
}
