import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createCustomer } from './helpers/braintree'
import { subscribeToMailchimpList } from './helpers/mailingList'

export const authUserCreated = functions.auth.user().onCreate(async (user) => {
	const data: any = {
		'bio/email': user.email,
		'roles/isStudent': true,
		'dates/signedUpAt': admin.database.ServerValue.TIMESTAMP,
		'account/questions': 5
	}

	if(user.displayName) data['bio/name'] = user.displayName
	if(user.photoURL) data['bio/image/link'] = user.photoURL

	try {
		const result = await createCustomer(user.displayName ?? '', user.email!)
		if(result.success) data['account/customerId'] = result.customer.id
	}catch(error){ console.log(error, user.uid,user.email) }

	try{
		await subscribeToMailchimpList(user.email!)
	}catch (error) { console.log(error, user.uid, user.email) }

	await admin.database().ref('profiles').child(user.uid).update(data)
})

export const authUserDeleted = functions.auth.user().onDelete(async (user) => {
	await admin.database().ref('profiles').child(user.uid)
		.child('dates/deletedAt')
		.set(admin.database.ServerValue.TIMESTAMP)
})
