import * as admin from 'firebase-admin'

export const getAllUserIds = async () => {
	const userIdsRef = await admin.database().ref('userIds').once('value')
	const userIdsObjects = userIdsRef.val()
	return Object.keys(userIdsObjects ?? {})
}
