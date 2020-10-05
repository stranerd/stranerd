import Router from 'vue-router'

const subdomains = [ 'auth', 'root' ]

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
	const options = routerOptions || createDefaultRouter(ssrContext).options

	let routesDirectory

	if (process.server && ssrContext && ssrContext.nuxt && ssrContext.req) {
		const req = ssrContext.req
		const matcher = req.headers.host.match(/^(\w+(-\w+)?)\.(localhost|\w+(-\w+)?)(\.\w+)?/) || ['root-domain']
		routesDirectory = matcher[1] || matcher[0]

		//TODO: Figure out how to extract base domain name and redirect there if subdomain doesn't exist
		routesDirectory = subdomains.includes(routesDirectory) ? routesDirectory : subdomains[subdomains.length - 1]
		ssrContext.nuxt.routesDirectory = routesDirectory
	}
	if (process.client) {
		if (window.__NUXT__ && window.__NUXT__.routesDirectory) {
			routesDirectory = window.__NUXT__.routesDirectory
		}
	}

	function isUnderDirectory(route, directory) {
		const path = route.path
		const isUnder = (path, dir) => (path === `/${dir}`) || (path.startsWith(`/${dir}/`))
		if (typeof directory == 'object') return directory.some((dir) => isUnder(path, dir))
		else return isUnder(path, directory)
	}

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
