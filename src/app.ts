import { getNewApplication, setupServer } from './utils/setup'
import { useAuthentication } from './auth'

const app = getNewApplication()

app.use(useAuthentication({
	useSubdomain: true
}))

setupServer(app)

export { app }
