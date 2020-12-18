import * as admin from 'firebase-admin'
import { deleteTask } from '../cloud-task'

enum ChallengeTypes {
	answers = 'answers'
}
type Challenge = {
	progress: number
	taskName?: string
	clone: {
		type: ChallengeTypes
		count: number
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
			.child('meta/currentChallenge')
			.set(null)
		await deleteTask(challenge.taskName)
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
