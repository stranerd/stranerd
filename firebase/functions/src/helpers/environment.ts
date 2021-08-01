import * as functions from 'firebase-functions'

const environment = () => functions.config().env ?? {}

export const appName = environment()?.app_name
export const isDev = () => environment()?.environment === 'development'
export const isStaging = () => environment()?.environment === 'staging'
export const isProduction = () => environment()?.environment === 'release'

export const stripe = () => ({
	secretKey: environment()?.stripe?.secret_key,
	publicKey: environment()?.stripe?.public_key
})

export const algolia = () => ({
	appId: environment()?.algolia?.app_id,
	apiKey: environment()?.algolia?.admin_api_key
})

export const mailchimp = () => ({
	apiKey: environment()?.mailchimp?.api_key,
	audienceId: environment()?.mailchimp?.audience_id,
	dataCenter: environment()?.mailchimp?.data_center
})

export enum EMAILS {
	NO_REPLY = 'no-reply@stranerd.com'
}

export const email = () => Object.fromEntries(
	Object.entries(EMAILS).map(([key, value]) => [value, {
		privateKey: environment()?.email?.[key.toLowerCase()]?.private_key,
		clientId: environment()?.email?.[key.toLowerCase()]?.client_id
	}])
)

export const firebase = () => ({
	projectId: environment()?.firebase_client_config?.project_id,
	location: environment()?.firebase_meta?.loc_long,
	taskEmail: environment()?.firebase_meta?.task_email
})

export const domain = () => `http${!isDev() ? 's' : ''}://${environment()?.domain}${isDev() ? `:${environment().port}` : ''}`
export const logo = () => `${domain()}/images/logo-white.png`
