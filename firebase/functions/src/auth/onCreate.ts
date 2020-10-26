import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createCustomer } from '../helpers/braintree'
import { subscribeToMailchimpList } from '../helpers/mailingList'

export const authUserCreated = functions.auth.user().onCreate(async (user) => {
	const data: any = {
		'profile/bio/email': user.email,
		'profile/roles/isStudent': true,
		'profile/dates/registeredAt': admin.database.ServerValue.TIMESTAMP,
		'account/questions': 5
	}

	if(user.displayName) data['profile/bio/name'] = user.displayName
	if(user.photoURL) data['profile/bio/image/link'] = user.photoURL

	try {
		const result = await createCustomer(user.displayName ?? '', user.email!)
		if(result.success) data['account/customerId'] = result.customer.id
	} catch (error) { console.log('Error creating new account for ', user.uid, user.email, error) }

	try{
		if (user.email) await subscribeToMailchimpList(user.email)
	} catch (error) { console.log('Error subscribing ', user.uid, user.email, error) }

	await admin.database().ref('users').child(user.uid).update(data)
})
