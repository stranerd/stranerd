export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'

export const useSubdomain = JSON.parse(process.env.USE_SUBDOMAIN ?? 'false') as boolean

export const port = JSON.parse(process.env.PORT ?? '8080') as number
export const domain = process.env.DOMAIN!
export const hostname = isDev ? `${domain}:${port}` : domain
export const ssl = JSON.parse(process.env.SSL ?? 'false') as boolean
export const protocol = `http${ssl ? 's' : ''}://`

export const isServer = () => process.server
export const isClient = () => process.client

const config = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG ?? '{}')
export const firebaseConfig = {
	apiKey: config.api_key,
	authDomain: config.auth_domain,
	databaseURL: config.database_url,
	projectId: config.project_id,
	storageBucket: config.storage_bucket,
	messagingSenderId: config.messaging_sender_id,
	appId: config.app_id,
	measurementId: config.measurement_id
}
