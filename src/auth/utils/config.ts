let configuration = {
	subdomain: true,
	path: 'auth',

	isDev: false
}

export const setConfig = (config: Configuration) =>  configuration = { ...configuration, ...config }

export const getConfig = () => configuration

export type Configuration = Partial<typeof configuration>
