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
	email: environment()?.email?.['email'],
	clientId: environment()?.email?.['client_id'],
	clientSecret: environment()?.email?.['client_secret'],
	refreshToken: environment()?.email?.['refresh_token']
})

export const host = () => environment()?.host
export const ssl = () => environment()?.ssl

export const domain = () => `${ssl() ? 'https://' : 'http://'}${host()}`
