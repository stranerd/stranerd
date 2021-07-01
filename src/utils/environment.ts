export const appName = process.env.APP_NAME
export const isDev = process.env.ENVIRONMENT === 'development'
export const isProd = process.env.ENVIRONMENT === 'production'

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

const algolia = JSON.parse(process.env.ALGOLIA ?? '{}')
export const algoliaConfig = {
	appId: algolia.app_id,
	searchAPIKey: algolia.search_api_key
}

const flutterwave = JSON.parse(process.env.FLUTTERWAVE ?? '{}')
export const flutterwaveConfig = {
	publicKey: flutterwave.public_key
}

export enum EMAILS {
	NO_REPLY = 'no-reply@stranerd.com'
}

const mails = JSON.parse(process.env.EMAIL ?? '{}')
export const email = Object.fromEntries(
	Object.entries(EMAILS).map(([key, value]) => [value, {
		privateKey: mails?.[key.toLowerCase()]?.private_key,
		clientId: mails?.[key.toLowerCase()]?.client_id
	}])
)

export const domain = `http${!isDev ? 's' : ''}://${process.env.DOMAIN}${isDev ? `:${process.env.PORT}` : ''}`
export const logo = `${domain}/images/stranerd_logo.svg`
