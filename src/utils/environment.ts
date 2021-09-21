export const appName = 'stranerd'
export const isDev = process.env.ENVIRONMENT === 'development'

export const isServer = () => process.server
export const isClient = () => process.client

export const googleClientId = process.env.GOOGLE_CLIENT_ID ?? ''

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

const flutterwave = JSON.parse(process.env.FLUTTERWAVE ?? '{}')
export const flutterwaveConfig = {
	publicKey: flutterwave.public_key
}

const stripe = JSON.parse(process.env.STRIPE ?? '{}')
export const stripeConfig = {
	publicKey: stripe.public_key
}

export const host = (process.env.DOMAIN ?? '') + (isDev ? `:${process.env.PORT}` : '')
export const domain = `http${!isDev ? 's' : ''}://${host}`
export const logo = `${domain}/images/logo-blue.svg`

const apis = JSON.parse(process.env.API_BASES ?? '{}')
export const apiBases = {
	AUTH: apis.auth,
	STRANERD: apis.stranerd,
	STORAGE: apis.storage
}
