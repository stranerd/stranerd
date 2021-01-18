import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
import {
	updateBioIfTutor, updateBraintreeBio, updateMyAnswerCommentsBio,
	updateMyAnswersBio, updateMyQuestionCommentsBio, updateMyQuestionsBio
} from '../../helpers/modules/users/users'
import { RankingPeriods } from '../../helpers/modules/users/rankings'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const oldBio = snap.before.val()
		const newBio = snap.after.val()
		const { userId } = context.params

		await admin.auth().updateUser(context.params.userId, {
			displayName: newBio.name
		})

		await updateBraintreeBio(userId, oldBio, newBio)
		await updateBioIfTutor(userId, newBio)
		await updateMyQuestionsBio(userId, newBio)
		await updateMyAnswersBio(userId, newBio)
		await updateMyQuestionCommentsBio(userId, newBio)
		await updateMyAnswerCommentsBio(userId, newBio)

		if(oldBio?.image?.path !== newBio?.image?.path)
			await deleteFromStorage(oldBio.image?.path)
	})

export const userCreditsUpdated = functions.database.ref('profiles/{userId}/account/credits')
	.onUpdate(async (snap, context) => {
		const diffInCredits = (snap.after.val() ?? 0) - (snap.before.val() ?? 0)

		if (diffInCredits > 0) {
			const { userId } = context.params
			await admin.database().ref('profiles')
				.child(userId)
				.child('rankings')
				.update(
					Object.values(RankingPeriods)
						.reduce((acc, cur) => {
							acc[cur] = admin.database.ServerValue.increment(diffInCredits)
							return acc
						}, {} as Record<string, any>)
				)
		}
	})
