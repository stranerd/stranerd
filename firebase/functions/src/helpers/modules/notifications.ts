import * as admin from 'firebase-admin'

type Type = 'info' | 'warning' | 'error' | 'success'

export type Notification = {
	title: string
	description: string
	seen: boolean
	type: Type
	action: string
	dates: {
		createdAt: Object
	}
}

export const createNotification = async (userId: string, data: { title: string, description: string, type: Type, action: string }) => {
	try{
		const notification: Notification = {
			...data, seen: false,
			dates: { createdAt: admin.database.ServerValue.TIMESTAMP }
		}

		await admin.database().ref(`users/${userId}/notifications`).push(notification)
	}catch(e){ console.log(e.message) }
}

