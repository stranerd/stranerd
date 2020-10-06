let configuration = {
	useSubdomain: false,
	path: 'api',

	isDev: false
}

export const setConfig = (config: Configuration) =>  configuration = { ...configuration, ...config }

export const getConfig = () => configuration

export type Configuration = Partial<typeof configuration>
