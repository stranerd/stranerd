import * as functions from 'firebase-functions'
import { subscribeToMailchimpList } from '../../helpers/mailingList'

export const subscribeToMailingList = functions.https.onCall(async ({ email }) => {
	try{
		await subscribeToMailchimpList(email)
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
