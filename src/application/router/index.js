import Router from 'vue-router'
import config from '@@/nuxt.config'
import { useSubdomain } from '@utils/enviroment'

const subs = config.subDomains.paths || []
const root = config.subDomains.root || 'root'

const subdomains = [root, ...subs]

const isUnderDirectory = (route, directory) => {
	const path = route.path
	const isUnder = (path, dir) => (path === `/${dir}`) || (path.startsWith(`/${dir}/`))
	if (typeof directory === 'object') { return directory.some((dir) => isUnder(path, dir)) } else { return isUnder(path, directory) }
}

export const createRouter = (ssrContext, createDefaultRouter, routerOptions) => {
	const options = routerOptions || createDefaultRouter(ssrContext).options

	if (!useSubdomain) {
		const routes = options.routes
		const nonRootRoutes = routes.filter((route) => !isUnderDirectory(route, root))

		const rootRoutes = routes
			.filter((route) => isUnderDirectory(route, root))
			.map((route) => ({
				...route,
				path: route.path.substr(root.length + 1) || '/',
				name: route.name.substr(root.length + 1) || 'index'
			}))

		return new Router({
			...options,
			routes: [...nonRootRoutes, ...rootRoutes]
		})
	}

	let routesDirectory

	if (process.server && ssrContext && ssrContext.nuxt && ssrContext.req) {
		const req = ssrContext.req
		const matcher = req.headers.host.match(/^(\w+(-\w+)?)\.(localhost|\w+(-\w+)?)(\.\w+)?/) || root
		routesDirectory = matcher[1] || matcher[0]

		routesDirectory = subdomains.includes(routesDirectory) ? routesDirectory : subdomains[0]
		ssrContext.nuxt.routesDirectory = routesDirectory
	}
	if (process.client && window.__NUXT__) routesDirectory = window.__NUXT__.routesDirectory

	let newRoutes = options.routes
	if (routesDirectory) {
		newRoutes = options.routes
			.filter((route) => {
				const toRemove = subdomains.filter((domain) => domain !== routesDirectory)
				return !isUnderDirectory(route, toRemove)
			})
			.map((route) => {
				if (isUnderDirectory(route, routesDirectory)) {
					return {
						...route,
						path: route.path.substr(routesDirectory.length + 1) || '/',
						name: route.name.substr(routesDirectory.length + 1) || 'index'
					}
				}
				return route
			})
	}

	return new Router({
		...options,
		routes: newRoutes
	})
}
