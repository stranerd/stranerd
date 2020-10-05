import { buildNuxt } from './utils/nuxt'
import { getNewApplication, setupServer } from './utils/setup'
import { useAuthentication } from './auth'

const app = getNewApplication()

const setup = async () => {
	const nuxt = await buildNuxt()

	app.use(useAuthentication({
		useSubdomain: true
	}))
	app.use(nuxt.render)

	setupServer(app)
}

setup()

export { app }
