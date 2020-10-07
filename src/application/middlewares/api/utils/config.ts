let configuration = {
	useSubdomain: false,
	path: 'api',
	host: undefined as string | undefined,

	isDev: false
}

export const setConfig = (config: Configuration) => configuration = { ...configuration, ...config }

export const getConfig = () => configuration

export type Configuration = Partial<typeof configuration> & { host: string }
