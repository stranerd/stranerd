import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { addUserCoins } from '../../helpers/modules/payments/transactions'
import { createNotification } from '../../helpers/modules/users/notifications'

export const newReferral = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can save new referrals')

	try {
		const { referrerId, email, userId } = data
		await addUserCoins(referrerId, { gold: 1, bronze: 20 }, 'Someone signed up with your referral link')
		await createNotification(referrerId, {
			title: 'New Referral Signup',
			body: `A new user with the email: ${email} just signed up with your referral link. Checkout his/her profile`,
			action: `/users/${userId}`
		})
		await admin.database().ref('profiles').child(referrerId).child('account/referrals').child(userId).set(true)
	} catch (e) {
		throw new functions.https.HttpsError('unknown', 'Error saving new referral')
	}
})
