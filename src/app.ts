const path = require('path')
const http = require('http')
const app = require('express')()
const consola = require('consola')
const { loadNuxt, build } = require('nuxt-start')

const getNuxt = async () => {
	const isDev = process.env.NODE_ENV !== 'production'
	const rootDir = path.join(__dirname, '..')
	const buildDir = path.join(__dirname, '..', 'build')
	if (isDev) {
		const nuxt = await loadNuxt({ for: 'dev', rootDir })
		await build(nuxt)
		return nuxt
	}
	return await loadNuxt({ for: 'start', rootDir, buildDir })
}

getNuxt().then((nuxt) => {
	app.use('/api', (_, res) => res.send('Api'))
	app.use('/in', (_, res) => res.send('In'))
	app.use(nuxt.render)

	const port = process.env.PORT || 8000

	app.set('port', port)

	const server = http.createServer(app)

	server.listen(port)
	server.on('listening', () => {
		const addr = server.address()
		const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
		consola.success(`Listening on ${bind}`)
	})
	server.on('error', (error) => {
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
})
