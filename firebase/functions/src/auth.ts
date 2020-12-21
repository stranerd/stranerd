import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createCustomer } from './helpers/braintree'
import { subscribeToMailchimpList } from './helpers/mailingList'
import { isProduction } from './helpers/environment'

export const authUserCreated = functions.auth.user().onCreate(async (user) => {
	const data: any = {
		'bio/email': user.email,
		'roles/isStudent': true,
		'dates/signedUpAt': admin.database.ServerValue.TIMESTAMP,
		'account/credits': 100
	}

	if (user.displayName) data['bio/name'] = user.displayName
	if (user.photoURL) data['bio/image/link'] = user.photoURL

	try {
		const result = await createCustomer(user.displayName ?? 'Unnamed', user.email!)
		if(result.success) data['account/braintreeId'] = result.customer.id
	} catch (error) {
		console.log(error)
		console.log('Failed to create user: ', user.uid, user.email)
	}

	try {
		if (isProduction()) await subscribeToMailchimpList(user.email!)
	} catch (error) {
		console.log(error)
		console.log('Failed to subscribe user to mailchimp: ', user.uid, user.email)
	}

	await admin.database().ref('profiles')
		.child(user.uid)
		.update(data)

	await admin.database().ref('userIds')
		.child(user.uid)
		.set(true)
})

export const authUserDeleted = functions.auth.user().onDelete(async (user) => {
	await admin.database().ref('profiles')
		.child(user.uid)
		.child('dates/deletedAt')
		.set(admin.database.ServerValue.TIMESTAMP)
	await admin.database().ref('userIds')
		.child(user.uid)
		.set(false)
})
