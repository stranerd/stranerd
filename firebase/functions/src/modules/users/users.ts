import * as functions from 'firebase-functions'
import {
	updateMyAnswerCommentsBio, updateMyAnswersBio, updateMyChatsBio,
	updateMyQuestionCommentsBio, updateMyQuestionsBio, updateMySessionsBio, updateMyTutorSessionsBio
} from '../../helpers/modules/users/users'
import { saveToAlgolia } from '../../helpers/algolia'
import { checkRank } from '../../helpers/modules/users/ranks'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const newBio = snap.after.val()
		const { userId } = context.params

		await saveToAlgolia('users', userId, { user: { bio: newBio } })

		await updateMyChatsBio(userId, newBio)
		await updateMyQuestionsBio(userId, newBio)
		await updateMyAnswersBio(userId, newBio)
		await updateMyQuestionCommentsBio(userId, newBio)
		await updateMyAnswerCommentsBio(userId, newBio)
		await updateMySessionsBio(userId, newBio)
		await updateMyTutorSessionsBio(userId, newBio)
	})

const path = 'profiles/{userId}/account/'

const callback = async (_: functions.Change<functions.database.DataSnapshot>, context: functions.EventContext) => {
	try {
		const { userId } = context.params
		await checkRank(userId)
	} catch (err) {}
}

export const userAccountRatingsUpdated = functions.database.ref(path + 'ratings').onWrite(callback)
export const userAccountTutorSessionsUpdated = functions.database.ref(path + 'meta/tutorSessions').onWrite(callback)
export const userAccountSessionsUpdated = functions.database.ref(path + 'meta/completedSessions').onWrite(callback)
export const userAccountQuestionsUpdated = functions.database.ref(path + 'meta/questions').onWrite(callback)
export const userAccountAnswersUpdated = functions.database.ref(path + 'meta/answers').onWrite(callback)
export const userAccountBestAnswersUpdated = functions.database.ref(path + 'meta/bestAnswers').onWrite(callback)
export const userAccountDailyLoginUpdated = functions.database.ref(path + 'streaks/longestStreak').onWrite(callback)
export const userAccountPurchaseCoinsUpdated = functions.database.ref(path + 'bought').onWrite(callback)
