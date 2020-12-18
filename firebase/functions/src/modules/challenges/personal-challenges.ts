import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { createTask } from '../../helpers/cloud-task'
import { isDev } from '../../helpers/environment'

export const personalChallengeCreated = functions.database.ref('users/{userId}/challenges/{id}')
	.onCreate(async (snap, context) => {
		const { userId, id } = context.params
		const challenge = snap.val()

		await admin.database().ref('profiles')
			.child(userId)
			.child('meta/currentChallenge')
			.set(id)

		if (!isDev()) {
			const name = await createTask({
				queue: 'challenges',
				endpoint: 'cancelChallenge',
				payload: { userId, id },
				timeInSecs: (challenge?.clone?.time ?? 10) * 60
			})

			await admin.database().ref('users')
				.child(userId)
				.child('challenges')
				.child('taskName')
				.set(name)
		}
	})
