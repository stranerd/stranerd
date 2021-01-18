import * as admin from 'firebase-admin'

export enum NotificationType {
	SUCCESS,
	INFO,
	WARNING,
	ERROR
}

type CreateNotification = {
	title: string
	description: string
	type: NotificationType
	action: string
}
export type Notification = CreateNotification & {
	seen: boolean
	dates: {
		createdAt: number
	}
}

export const createNotification = async (userId: string, data: CreateNotification) => {
	try{
		await admin.database().ref(`users/${userId}/notifications`)
			.push({
				...data, seen: false,
				dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
			})
	} catch (e) {
		console.log(`Failed to create notification for: ${userId}.\n${e.message}`)
	}
}

