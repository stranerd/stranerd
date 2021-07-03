import * as functions from 'firebase-functions'
import {
	updateMyAnswerCommentsBio, updateMyAnswersBio, updateMyChatsBio,
	updateMyQuestionCommentsBio, updateMyQuestionsBio, updateMySessionsBio, updateMyTutorSessionsBio
} from '../../helpers/modules/users/users'
import { saveToAlgolia } from '../../helpers/algolia'

export const userProfileUpdated = functions.database.ref('profiles/{userId}/bio')
	.onUpdate(async (snap, context) => {
		const newBio = snap.after.val()
		const { userId } = context.params

		await saveToAlgolia('users', userId, { user: { bio: newBio } })

		await updateMyChatsBio(userId, newBio)
		await updateMySessionsBio(userId, newBio)
		await updateMyTutorSessionsBio(userId, newBio)
		await updateMyQuestionsBio(userId, newBio)
		await updateMyAnswersBio(userId, newBio)
		await updateMyQuestionCommentsBio(userId, newBio)
		await updateMyAnswerCommentsBio(userId, newBio)
	})
