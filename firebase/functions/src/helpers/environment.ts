import * as functions from 'firebase-functions'

const environment = () => functions.config().env ?? {}

export const appName = 'Stranerd'
export const isDev = () => environment()?.environment === 'development'
export const isStaging = () => environment()?.environment === 'staging'
export const isProduction = () => environment()?.environment === 'production'

export const paypal = () => ({
	clientId: environment()?.paypal?.['client_id'],
	clientSecret: environment()?.paypal?.['client_secret']
})

export const braintree = () => ({
	merchantId: environment()?.braintree?.['merchant_id'],
	publicKey: environment()?.braintree?.['public_key'],
	privateKey: environment()?.braintree?.['private_key']
})

export const algolia = () => ({
	appId: environment()?.algolia?.['app_id'],
	apiKey: environment()?.algolia?.['admin_api_key']
})

export const mailchimp = () => ({
	apiKey: environment()?.mailchimp?.['api_key'],
	audienceId: environment()?.mailchimp?.['audience_id'],
	dataCenter: environment()?.mailchimp?.['data_center']
})

export const email = () => ({
	privateKey: environment()?.email?.['private_key'],
	clientId: environment()?.email?.['client_id'],
})

export const firebase = () => ({
	projectId: environment()?.firebase_client_config?.['project_id'],
	location: environment()?.firebase_meta?.['loc_long'],
	taskEmail: environment()?.firebase_meta?.['task_email'],
})

export const domain = () => `http${!isDev() ? 's' : ''}://${environment()?.domain}`
export const logo = () => `${domain()}/images/stranerd_logo.svg`
