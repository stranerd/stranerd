import './utils/environment'
import { buildNuxt } from './utils/nuxt'
import { getNewApplication, setupServer, useBodyParser, useCSRF } from './utils/setup'
import { useAPI } from './api'
import { isDev } from './utils/environment'

const app = getNewApplication()

const setup = async () => {
	const nuxt = await buildNuxt()

	useBodyParser(app)
	useCSRF(app)

	app.use(useAPI({
		useSubdomain: true,
		isDev: isDev(),
	}))
	app.use(nuxt.render)

	setupServer(app)
}

setup()

export { app }
