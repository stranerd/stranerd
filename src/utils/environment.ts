export const isDev = process.env.ENVIRONMENT === 'development'
export const isProd = process.env.ENVIRONMENT === 'production'

export const useSubdomain = JSON.parse(process.env.USE_SUBDOMAIN ?? 'false') as boolean

export const port = JSON.parse(process.env.PORT ?? '8080') as number
export const host = process.env.HOST!
export const hostname = isDev ? `${host}:${port}` : host
export const ssl = JSON.parse(process.env.SSL ?? 'false') as boolean
export const protocol = `http${ssl ? 's' : ''}://`

export const isServer = () => process.server
export const isClient = () => process.client
