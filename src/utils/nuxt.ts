import * as path from 'path'
// @ts-ignore
import { Nuxt, build } from 'nuxt'

export const buildNuxt = async () => {
	const dev = process.env.NODE_ENV !== 'production'

	const rootDir = path.join(__dirname, '../../application')

	let config = require(path.join(rootDir, 'nuxt.config.js'))
	config = { ...config, ...{ dev, rootDir } }

	const nuxt = new Nuxt(config)
	await nuxt.ready()

	if (dev) await build(nuxt)

	return nuxt
}
