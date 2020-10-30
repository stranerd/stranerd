import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createCustomer } from '../helpers/braintree'
import { subscribeToMailchimpList } from '../helpers/mailingList'

export const authUserCreated = functions.auth.user().onCreate(async (user) => {
	const profile: any = {
		bio: { email: user.email },
		roles: { isStudent: true },
		dates: { signedUpAt: admin.firestore.FieldValue.serverTimestamp() }
	}
	const dbData: any = { 'account/questions': 5 }

	if(user.displayName) profile.bio.name = user.displayName
	if(user.photoURL) profile.bio.image = { link: user.photoURL }

	try {
		const result = await createCustomer(user.displayName ?? '', user.email!)
		if(result.success) dbData['account/customerId'] = result.customer.id
	} catch (error) { console.log('Error creating new account for ', user.uid, user.email, error) }

	try{
		if (user.email) await subscribeToMailchimpList(user.email)
	} catch (error) { console.log('Error subscribing ', user.uid, user.email, error) }

	await admin.firestore().collection('users')
		.doc(user.uid)
		.set(profile, { merge: true })
	await admin.database().ref('users')
		.child(user.uid)
		.update(dbData)
})
