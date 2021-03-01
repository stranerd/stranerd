import * as functions from 'firebase-functions'
import { addUserCoins, addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
import { Achievement } from '../../helpers/modules/users/achievements'

export const tipNerd = functions.https.onCall(async (data, context) => {
	if (!context.auth)
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can tip nerds')

	try {
		const { tutorId, amount } = data
		return await tipTutor(context.auth.uid, tutorId, amount)
	} catch (e) {
		throw new functions.https.HttpsError('unknown', 'Error tipping nerd')
	}
})

const tipTutor = async (userId: string, tutorId: string, amount: number) => {
	await addUserCoins(userId, { bronze: 0, gold: 0 - amount },
		'You tipped a nerd coins'
	)
	await addUserCoins(tutorId, { bronze: 0, gold: amount },
		'You were tipped coins'
	)
	await addUserXp(userId, XpGainList.TIP_NERD)
	await Achievement.checkTipNerdsAchievement(userId)
}

