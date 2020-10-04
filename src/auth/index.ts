import * as Express from 'express'
//@ts-ignore
import * as subdomain from 'express-subdomain'
import { Configuration, getConfig, setConfig } from './utils/config'
import { router } from './routes'

export const useAuthentication = (config: Configuration) => {
	setConfig(config)
	const { useSubdomain, path } = getConfig()

	const app = Express.Router()

	if(useSubdomain) app.use(subdomain(path, router))
	else app.use(`/${path}`, router)

	return app
}
