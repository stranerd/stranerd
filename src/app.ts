import './utils/environment'
import { buildNuxt } from './utils/nuxt'
import { getNewApplication, setupServer, useBodyParser, useCORS } from './utils/setup'
import { useAPI, CheckSignedInUserMiddleware } from './api'
import { host, isDev } from './utils/environment'

const app = getNewApplication()

const setup = async () => {
	const nuxt = await buildNuxt()

	useBodyParser(app)
	useCORS(app)

	app.use(useAPI({
		useSubdomain: true,
		isDev: isDev(),
		host: host(),
	}))

	app.use(CheckSignedInUserMiddleware)
	app.use(nuxt.render)

	setupServer(app)
}

setup()

export { app }
