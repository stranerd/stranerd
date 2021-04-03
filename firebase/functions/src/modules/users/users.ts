import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {
	updateBraintreeBio, updateMyAnswerCommentsBio, updateMyAnswersBio, updateMyChatsBio,
	updateMyQuestionCommentsBio, updateMyQuestionsBio, updateMySessionsBio, updateMyTutorSessionsBio
} from '../../helpers/modules/users/users'
import { addUserXp, XpGainList } from '../../helpers/modules/payments/transactions'
import { saveToAlgolia } from '../../helpers/algolia'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const oldBio = snap.before.val()
		const newBio = snap.after.val()
		const { userId } = context.params

		await saveToAlgolia('users', userId, newBio)

		await updateMyChatsBio(userId, newBio)
		await updateMySessionsBio(userId, newBio)
		await updateMyTutorSessionsBio(userId, newBio)
		await updateMyQuestionsBio(userId, newBio)
		await updateMyAnswersBio(userId, newBio)
		await updateMyQuestionCommentsBio(userId, newBio)
		await updateMyAnswerCommentsBio(userId, newBio)
		await updateBraintreeBio(userId, oldBio, newBio)
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
