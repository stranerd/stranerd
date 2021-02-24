import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {
	addUserXp, updateBraintreeBio, updateMyAnswerCommentsBio, updateMyAnswersBio, updateMyQuestionCommentsBio,
	updateMyQuestionsBio, updateMySessionsBio, updateMyTutorSessionsBio, XpGainList
} from '../../helpers/modules/users/users'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const oldBio = snap.before.val()
		const newBio = snap.after.val()
		const { userId } = context.params

		await updateBraintreeBio(userId, oldBio, newBio)
		await updateMyQuestionsBio(userId, newBio)
		await updateMyAnswersBio(userId, newBio)
		await updateMyQuestionCommentsBio(userId, newBio)
		await updateMyAnswerCommentsBio(userId, newBio)
		await updateMySessionsBio(userId, newBio)
		await updateMyTutorSessionsBio(userId, newBio)
	})

export const userAvatarCreated = functions.database.ref('profiles/{userId}/bio/avatar')
	.onCreate(async (_, context) => {
		const { userId } = context.params
		let hasSetAvatarBefore = true

		await admin.database().ref('users')
			.child(userId)
			.child('hasSetAvatarBefore')
			.transaction((setAvatarBefore: boolean | null) => {
				hasSetAvatarBefore = setAvatarBefore ?? false
				return true
			})

		if (!hasSetAvatarBefore) await addUserXp(userId, XpGainList.PICK_AVATAR)
	})
