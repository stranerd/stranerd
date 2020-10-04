import * as http from 'http'
import * as Express from 'express'
import consola from 'consola'


export const getNewApplication = () => Express()

export const setupServer = (app: Express.Application) => {
	const port = process.env.PORT || 8000

	app.set('port', port)

	const server = http.createServer(app)

	server.listen(port)
	server.on('listening', () => {
		const addr = server.address()
		const bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr?.address}:${addr?.port}`
		consola.success(`Listening on ${bind}`)
	})
	server.on('error', (error: any) => {
		if (error.syscall !== 'listen') { throw error }
		const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`

		switch (error.code) {
		case 'EACCES':
			consola.error(`${bind} requires elevated privileges`)
			break
		case 'EADDRINUSE':
			consola.error(`${bind} is already in use`)
			break
		default:
			throw error
		}
	})

}
