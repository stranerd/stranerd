import * as functions from 'firebase-functions'
import { subscribeToMailchimpList } from '../../helpers/mailingList'
import { defaultConfig } from '../../helpers/functions'

export const subscribeToMailingList = functions.runWith(defaultConfig).https.onCall(async ({ email }) => {
	try {
		await subscribeToMailchimpList(email)
	} catch (error) {
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
