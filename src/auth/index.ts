import * as Express from 'express'
//@ts-ignore
import * as subdomain from 'express-subdomain'
import { Configuration, getConfig, setConfig } from './utils/config'

export const useAuthentication = (config: Configuration) => {
	setConfig(config)
	const { useSubdomain, path } = getConfig()

	const app = Express.Router()

	const router = Express.Router()
	router.get('*', (req, res) => res.json(getConfig()))

	if(useSubdomain) app.use(subdomain(path, router))
	else app.use(`/${path}`, router)

	return app
}
