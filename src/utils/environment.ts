export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'

export const useSubdomain = JSON.parse(process.env.USE_SUBDOMAIN ?? 'false') as boolean

export const port = JSON.parse(process.env.PORT ?? '8080') as number
export const host = process.env.HOST!
export const hostname = isDev ? `${host}:${port}` : host
export const ssl = JSON.parse(process.env.SSL ?? 'false') as boolean
export const protocol = `http${ssl ? 's' : ''}://`

export const isServer = () => process.server
export const isClient = () => process.client

export const firebaseConfig = {
	apiKey: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').api_key,
	authDomain: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').auth_domain,
	databaseURL: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').database_url,
	projectId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').project_id,
	storageBucket: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').storage_bucket,
	messagingSenderId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').messaging_sender_id,
	appId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').app_id,
	measurementId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').measurement_id
}
