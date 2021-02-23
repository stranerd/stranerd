import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromStorage } from '../../helpers/storage'
import {
	updateBraintreeBio, updateMyAnswerCommentsBio,
	updateMyAnswersBio, updateMyQuestionCommentsBio, updateMyQuestionsBio
} from '../../helpers/modules/users/users'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const oldBio = snap.before.val()
		const newBio = snap.after.val()
		const { userId } = context.params

		await admin.auth().updateUser(context.params.userId, {
			displayName: newBio.name
		})

		await updateBraintreeBio(userId, oldBio, newBio)
		await updateMyQuestionsBio(userId, newBio)
		await updateMyAnswersBio(userId, newBio)
		await updateMyQuestionCommentsBio(userId, newBio)
		await updateMyAnswerCommentsBio(userId, newBio)

		if(oldBio?.image?.path !== newBio?.image?.path)
			await deleteFromStorage(oldBio.image?.path)
	})
