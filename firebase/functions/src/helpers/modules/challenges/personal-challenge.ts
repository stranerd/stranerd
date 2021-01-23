import * as admin from 'firebase-admin'
import { deleteTask } from '../../cloud-task'
import { createTransaction, CURRENCY_PLURAL } from '../payments/transactions'
import { createNotification, NotificationType } from '../users/notifications'

enum ChallengeTypes {
	answers = 'answers'
}
type Challenge = {
	progress: number
	taskName?: string
	clone: {
		id: string
		type: ChallengeTypes
		time: number,
		description: string,
		count: number
		reward: number
		meta: Record<string, any>
	}
}

export const progressPersonalChallenge = async (userId: string, payload: any) => {
	const idRef = await admin.database().ref('profiles')
		.child(userId)
		.child('meta/currentChallenge')
		.once('value')
	const challengeId = idRef.val()

	if (!challengeId) return

	const challengeRef = await admin.database().ref('users')
		.child(userId)
		.child('challenges')
		.child(challengeId)
		.once('value')
	const challenge = challengeRef.val() as Challenge

	if (!checkIfPayloadFitsType(challenge.clone, payload)) return
	if (!checkIfPayloadSatisfiesCondition(challenge.clone, payload)) return

	await admin.database().ref('users')
		.child(userId)
		.child('challenges')
		.child(challengeId)
		.child('progress')
		.set(admin.database.ServerValue.increment(1))

	if (isLastTask(challenge) && challenge.taskName) {
		await admin.database().ref('profiles')
			.child(userId)
			.update({
				'meta/currentChallenge': null,
				'account/credits': admin.database.ServerValue.increment(challenge.clone.reward)
			})
		await deleteTask(challenge.taskName)
		await createNotification(userId, {
			title: 'Challenge completed',
			body: `You just completed the challenge '${challenge.clone.description}' and earned ${challenge.clone.reward} ${CURRENCY_PLURAL}`,
			type: NotificationType.INFO,
			action: '/account/challenges'
		})
		await createTransaction(userId, {
			amount: challenge.clone.reward,
			event: `You earned ${challenge.clone.reward} ${CURRENCY_PLURAL} for completing a challenge`
		})
	}
}

const checkIfPayloadFitsType = (challenge: Challenge['clone'], payload: any) => {
	if (challenge.type === ChallengeTypes.answers) return Boolean(payload.subjectId)
	return false
}

const checkIfPayloadSatisfiesCondition = (challenge: Challenge['clone'], payload: any) => {
	if (challenge.type === ChallengeTypes.answers) return challenge.meta.subjectId === '' || challenge.meta.subjectId === payload.subjectId
	return false
}

const isLastTask = (challenge: Challenge) => challenge.progress + 1 === challenge.clone.count
