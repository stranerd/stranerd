import * as http from 'http'
import * as Express from 'express'
import * as consola from 'consola'
import * as CookieParser from 'cookie-parser'
import * as Cors from 'cors'
import { port, host } from './environment'

export const getNewApplication = () => Express()

export const setupServer = (app: Express.Application) => {
	app.set('port', port())
	app.set('host', host())
	app.set('trust proxy', true)

	const server = http.createServer(app)

	server.listen(port())

	const bind = `${host()}:${port()}`
	server.on('listening', () => {
		//@ts-ignore
		consola.success(`Listening on ${bind}`)
	})
	server.on('error', (error: any) => {
		if (error.syscall !== 'listen') { throw error }

		switch (error.code) {
		case 'EACCES':
			//@ts-ignore
			consola.error(`${bind} requires elevated privileges`)
			break
		case 'EADDRINUSE':
			//@ts-ignore
			consola.error(`${bind} is already in use`)
			break
		default:
			throw error
		}
	})

}

export const useCORS = (app: Express.Application) => {
	app.use(Cors())
}

export const useBodyParser = (app: Express.Application) => {
	app.use(Express.json())
	app.use(Express.urlencoded({ extended: false }))
	app.use(CookieParser())
}
