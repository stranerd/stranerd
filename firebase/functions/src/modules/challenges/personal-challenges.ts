import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { createTask, deleteTask } from '../../helpers/cloud-task'

export const personalChallengeCreated = functions.database.ref('users/{userId}/challenges/{id}')
	.onCreate(async (snap, context) => {
		const { userId, id } = context.params
		const challenge = snap.val()

		await admin.database().ref('profiles')
			.child(userId)
			.child('meta/currentChallenge')
			.set(id)

		try {
			const name = await createTask({
				queue: 'challenges',
				endpoint: 'cancelChallenge',
				payload: { userId, id },
				timeInSecs: ((challenge?.clone?.time ?? 1) * 3600) + (Date.now() / 1000)
			})

			await admin.database().ref('users')
				.child(userId)
				.child('challenges')
				.child(id)
				.child('taskName')
				.set(name)
		} catch (error) { console.log('Failed creating task ', id, './n',error.message) }
	})

export const personalChallengeCancelled = functions.database.ref('users/{userId}/challenges/{id}/cancelled')
	.onUpdate(async (snap, context) => {
		if (!snap.after.val()) return
		const { userId, id } = context.params

		await admin.database().ref('profiles')
			.child(userId)
			.child('meta/currentChallenge')
			.transaction((challenge) => {
				if (challenge === id) return null
				return challenge
			})

		const taskRef = await admin.database().ref('users')
			.child(userId)
			.child('challenges')
			.child(id)
			.child('taskName')
			.once('value')
		if (taskRef.val()) await deleteTask(taskRef.val())
	})
