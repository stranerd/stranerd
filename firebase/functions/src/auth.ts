import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { subscribeToMailchimpList } from './helpers/mailingList'
import { isProduction } from './helpers/environment'
import { deleteFromAlgolia } from './helpers/algolia'

export const authUserCreated = functions.auth.user().onCreate(async (user) => {
	const [first = null, last = null] = user.displayName?.split(' ') ?? []

	const data = {
		...(first ? { 'bio/name/first': first } : {}),
		...(last ? { 'bio/name/last': last } : {}),
		'bio/email': user.email,
		'bio/isNew': true,
		'dates/signedUpAt': admin.database.ServerValue.TIMESTAMP,
		'account/coins/bronze': admin.database.ServerValue.increment(100),
		'account/ratings/total': 0,
		'account/ratings/count': 0,
		'account/streak/longestStreak': 1,
		'account/streak/count': 1,
		'account/streak/lastCheck': admin.database.ServerValue.TIMESTAMP
	}

	const profileData = Object.fromEntries(
		Object.entries(data)
			.map(([key, val]) => [`profiles/${user.uid}/${key}`, val])
	)

	await admin.database().ref()
		.update({
			...profileData,
			[`userIds/${user.uid}`]: true
		})

	try {
		if (isProduction()) await subscribeToMailchimpList(user.email!)
	} catch (error) {
		console.log(`Failed to create mailchimp user: ${user.uid}-${user.email}.\n${error.message}`)
	}
})

export const authUserDeleted = functions.auth.user().onDelete(async (user) => {
	await admin.database().ref()
		.update({
			[`profiles/${user.uid}/dates/deletedAt`]: admin.database.ServerValue.TIMESTAMP,
			[`userIds/${user.uid}`]: false
		})
	await deleteFromAlgolia('users', user.uid)
})

export const deleteUnVerifiedUsers = async () => {
	try {
		const userIds = [] as string[]
		const listAllUsers = async (nextPageToken?: string) => {
			try {
				const { users, pageToken } = await admin.auth().listUsers(1000, nextPageToken)
				users.forEach((user) => {
					if (user.emailVerified) return
					const createdAt = new Date(user.metadata.creationTime)
					const threeDays = 3 * 86400 * 1000
					if (Date.now() - createdAt.getTime() < threeDays) return
					userIds.push(user.uid)
				})
				if (pageToken) await listAllUsers(pageToken)
			} catch (err) {}
		}
		await listAllUsers()
		userIds.forEach(admin.auth().deleteUser)
	} catch (err) {}
}
