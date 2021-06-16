import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createCustomer } from './helpers/braintree'
import { subscribeToMailchimpList } from './helpers/mailingList'
import { isProduction } from './helpers/environment'

export const authUserCreated = functions.auth.user().onCreate(async (user) => {
	const data: any = {
		'bio/email': user.email,
		'bio/isNew': true,
		'roles/isStudent': true,
		'dates/signedUpAt': admin.database.ServerValue.TIMESTAMP,
		'account/coins/bronze': admin.database.ServerValue.increment(100),
		'status/streak': 0,
		'status/lastStreakCheck': admin.database.ServerValue.TIMESTAMP
	}

	try {
		const result = await createCustomer(user.displayName ?? 'Unnamed', user.email!)
		if (result.success) data['account/braintreeId'] = result.customer.id
	} catch (error) {
		console.log(`Failed to create braintree user: ${user.uid}-${user.email}.\n${error.message}`)
	}

	const profileData = Object.fromEntries(
		Object.entries(data)
			.map((entry) => [`profiles/${user.uid}/${entry[0]}`, entry[1]])
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
})

export const deleteUnVerifiedUsers = async () => {
	try {
		const userIds = [] as string[]
		const listAllUsers = async (nextPageToken?: string) => {
			try {
				const result = await admin.auth().listUsers(1000, nextPageToken)
				result.users.forEach((user) => {
					if (user.emailVerified) return
					const createdAt = new Date(user.metadata.creationTime)
					const threeDays = 3 * 86400 * 1000
					if (Date.now() - createdAt.getTime() < threeDays) return
					userIds.push(user.uid)
				})
				if (result.pageToken) await listAllUsers(result.pageToken)
			} catch (err) {}
		}
		await listAllUsers()
		userIds.forEach(admin.auth().deleteUser)
	} catch (err) {}
}
