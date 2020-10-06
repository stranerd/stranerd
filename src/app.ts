import { buildNuxt } from './utils/nuxt'
import { getNewApplication, setupServer } from './utils/setup'
import { useAPI } from './api'

const app = getNewApplication()

const setup = async () => {
	const nuxt = await buildNuxt()

	app.use(useAPI({
		useSubdomain: true
	}))
	app.use(nuxt.render)

	setupServer(app)
}

setup()

export { app }
