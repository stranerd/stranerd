import Express from 'express'
import CookieParser from 'cookie-parser'
import Cors from 'cors'

export const useApp = (app: Express.Router) => {
	app.use((req, res, next) => {
		Object.setPrototypeOf(req, Express().request)
		Object.setPrototypeOf(res, Express().response)
		req.res = res
		res.req = req
		next()
	})
}

export const useCORS = (app: Express.Router) => {
	app.use(Cors())
}

export const useBodyParser = (app: Express.Router) => {
	app.use(Express.json())
	app.use(Express.urlencoded({ extended: false }))
	app.use(CookieParser())
}
