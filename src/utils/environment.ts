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

export const firebaseConfig = {
	apiKey: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').apiKey,
	authDomain: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').authDomain,
	databaseURL: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').databaseURL,
	projectId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').projectId,
	storageBucket: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').storageBucket,
	messagingSenderId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').messagingSenderId,
	appId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').appId,
	measurementId: JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').measurementId
}
