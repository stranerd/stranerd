import * as http from 'http'
import * as Express from 'express'
import * as consola from 'consola'
import * as CookieParser from 'cookie-parser'
import * as CSRF from 'csurf'
import * as Cors from 'cors'

export const getNewApplication = () => Express()

export const setupServer = (app: Express.Application) => {
	const port = process.env.PORT || 8000

	app.set('port', port)

	const server = http.createServer(app)

	server.listen(port)
	server.on('listening', () => {
		const addr = server.address()
		const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`
		//@ts-ignore
		consola.success(`Listening on ${bind}`)
	})
	server.on('error', (error: any) => {
		if (error.syscall !== 'listen') { throw error }
		const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`

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

export const useCSRF = (app: Express.Application) => {
	app.use(CookieParser())
	app.use(CSRF({ cookie: true }))
	app.use(Cors())

	app.use((req,res, next) =>{
		res.cookie('XSRF-TOKEN', req.csrfToken())
		next()
	})
}

export const useBodyParser = (app: Express.Application) => {
	app.use(Express.json())
	app.use(Express.urlencoded({ extended: false }))
}
