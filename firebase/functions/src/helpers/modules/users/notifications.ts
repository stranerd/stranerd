import * as admin from 'firebase-admin'
import { getAllUserIds } from './users'

export enum NotificationType {
	SUCCESS,
	INFO,
	WARNING,
	ERROR
}
type CreateNotification = {
	title: string
	body: string
	type: NotificationType
	action: string
}
export type Notification = CreateNotification & {
	id: string
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

const getOldNotifications = async (userId: string) => {
	const weekInMs = 1000 * 60 * 60 * 24 * 7
	const notificationRefs = await admin.database().ref(`users/${userId}/notifications`)
		.orderByChild('seen')
		.equalTo(true)
		.once('value')
	const notifications = [] as Notification[]
	notificationRefs.forEach((child) => {
		const notification = { ... child.val(), id: child.key! } as Notification
		notifications.push(notification)
	})
	return notifications
		.filter((n) => n.dates.createdAt < (Date.now() - weekInMs))
		.map((n) => n.id)
}

export const deleteOlderNotifications = async () => {
	const userIds = await getAllUserIds()
	const data = await Promise.all(
	    userIds.map(async (userId) => {
	        const notifications = await getOldNotifications(userId)
		    return notifications.map((id) => `${userId}/notifications/${id}`)
	    })
	)
	const allNotifications = data
		.reduce((acc, cur) => {
			acc.push(...cur)
			return acc
		}, [] as string[])
		.reduce((acc, cur) => {
			acc[cur] = null
			return acc
		}, {} as Record<string, null>)

	await admin.database().ref('users').update(allNotifications)
}
