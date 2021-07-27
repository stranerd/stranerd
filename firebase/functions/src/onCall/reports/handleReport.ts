import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const WARNING_COUNT = 3
const SUSPEND_COUNT = 3

export const handleReport = functions.https.onCall(async (data, context) => {
	if (!context.auth || !context.auth.token.isAdmin)
		throw new functions.https.HttpsError('unauthenticated', 'Only admins can handle reports')

	const { id = '', key = '', userId = '' } = data

	// TODO: Confirm if stats are shared between keys or separated
	const reportRef = await admin.database().ref('profiles').child(userId).child('reports').child(key)
	const { warning = 0, suspend = 0 } = (await reportRef.once('value')).val() ?? {}

	const takeMeasure = (warning: number, suspend: number) => {
		if (warning + 1 <= WARNING_COUNT) return warnUser
		if (suspend + 1 <= SUSPEND_COUNT) return suspendUser
		return deleteUser
	}
	await takeMeasure(warning, suspend)()

	const warnUser = async () => {
		// TODO: send notification warning
		await admin.database().ref().update({
			[`profiles/${userId}/reports/${key}/warning`]: admin.database.ServerValue.increment(1),
			[`reports/${key}/${id}`]: null
		})
	}
	const suspendUser = async () => {
		// TODO: set suspension action
		await admin.database().ref().update({
			[`profiles/${userId}/reports/${key}/warning`]: 0,
			[`profiles/${userId}/reports/${key}/suspend`]: admin.database.ServerValue.increment(1),
			[`reports/${key}/${id}`]: null
		})
	}
	const deleteUser = async () => {
		// TODO: delete user account
		await admin.database().ref().update({
			[`profiles/${userId}/reports/${key}/warning`]: 0,
			[`profiles/${userId}/reports/${key}/suspend`]: 0,
			[`reports/${key}/${id}`]: null
		})
	}
})
