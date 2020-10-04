import * as Express from 'express'
import { Configuration, getConfig, setConfig } from './utils/config'

export const initializeAuth = (config: Configuration) => {
	setConfig(config)

	const router = Express.Router()

	router.get('*', (req, res) => res.json({ config: getConfig() }))

	return router
}
