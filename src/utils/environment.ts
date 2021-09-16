export const appName = process.env.APP_NAME
export const isDev = process.env.ENVIRONMENT === 'development'

export const isServer = () => process.server
export const isClient = () => process.client

const firebase = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG ?? '{}')
export const firebaseConfig = {
	apiKey: firebase.api_key,
	authDomain: firebase.auth_domain,
	databaseURL: firebase.database_url,
	projectId: firebase.project_id,
	storageBucket: firebase.storage_bucket,
	messagingSenderId: firebase.messaging_sender_id,
	appId: firebase.app_id,
	measurementId: firebase.measurement_id
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

const stripe = JSON.parse(process.env.STRIPE ?? '{}')
export const stripeConfig = {
	publicKey: stripe.public_key
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

export const host = (process.env.DOMAIN ?? '') + (isDev ? `:${process.env.PORT}` : '')
export const domain = `http${!isDev ? 's' : ''}://${host}`
export const logo = `${domain}/images/logo-blue.svg`

export const apiBases = {
	AUTH: 'http://localhost:80/api/auth',
	STRANERD: 'http://localhost:80/api/stranerd',
	STORAGE: 'http://localhost:80/api/storage'
}
