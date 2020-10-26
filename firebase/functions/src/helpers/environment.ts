import * as functions from 'firebase-functions'

export const isDev = () => functions.config()?.environment?.mode === 'development'
export const isProduction = () => functions.config()?.environment?.mode === 'production'

const environment = () => isProduction() ? 'production' : 'development'

export const environmentVariables = {
	paypal: {
		clientId: functions.config().paypal[environment()]['client_id'],
		clientSecret: functions.config().paypal[environment()]['client_secret'],
	},
	braintree: {
		merchantId: functions.config().braintree[environment()]['merchant_id'],
		publicKey: functions.config().braintree[environment()]['public_key'],
		privateKey: functions.config().braintree[environment()]['private_key']
	},
	algolia: {
		appId: functions.config().algolia[environment()]['app_id'],
		apiKey: functions.config().algolia[environment()]['api_key'],
	},
	mailchimp: {
		apiKey: functions.config().mailchimp['api_key'],
		audienceId: functions.config().mailchimp['audience_id'],
		dataCenter: functions.config().mailchimp['data_center']
	},
	admin: {
		meta: {
			domain: functions.config().admin[environment()].meta['domain'],
		},
		email: {
			email: functions.config().admin[environment()].email['email'],
			clientId: functions.config().admin[environment()].email['client_id'],
			clientSecret: functions.config().admin[environment()].email['client_secret'],
			refreshToken: functions.config().admin[environment()].email['refresh_token']
		}
	}
}
