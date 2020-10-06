import './utils/environment'
import { buildNuxt } from './utils/nuxt'
import { getNewApplication, setupServer } from './utils/setup'
import { useAPI } from './api'
import { isDev } from './utils/environment'

const app = getNewApplication()

const setup = async () => {
	const nuxt = await buildNuxt()

	app.use(useAPI({
		useSubdomain: true,
		isDev: isDev(),
	}))
	app.use(nuxt.render)

	setupServer(app)
}

setup()

export { app }
