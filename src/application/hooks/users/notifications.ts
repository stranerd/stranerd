import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { GetNotifications, ListenToNotifications, NotificationEntity } from '@modules/users'
import { PAGINATION_LIMIT } from '@utils/constants'

const global = {} as Record<string, {
	notifications: Ref<NotificationEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToNotificationList = (userId: string, notification: NotificationEntity) => {
	const index = global[userId].notifications.value.findIndex((t) => t.id === notification.id)
	if (index !== -1) global[userId].notifications.value.splice(index, 1, notification)
	else global[userId].notifications.value.push(notification)
}

const unshiftToNotificationList = (userId: string, notification: NotificationEntity) => {
	const index = global[userId].notifications.value.findIndex((t) => t.id === notification.id)
	if (index !== -1) global[userId].notifications.value.splice(index, 1, notification)
	else global[userId].notifications.value.unshift(notification)
}

export const useNotificationList = (userId: string) => {
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			const appendNotifications = (notifications: NotificationEntity[]) => { notifications.forEach((notification) => unshiftToNotificationList(userId, notification)) }
			const date = global[userId].notifications.value[0]?.createdAt
			return ListenToNotifications.call(userId, appendNotifications, date)
		})
		global[userId] = {
			notifications: ssrRef([]),
			hasMore: ssrRef(false),
			fetched: ssrRef(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchNotifications = async () => {
		global[userId].setError('')
		global[userId].setLoading(true)
		try {
			const notifications = await GetNotifications.call(userId)
			global[userId].hasMore.value = notifications.length === PAGINATION_LIMIT + 1
			notifications.reverse().slice(0, PAGINATION_LIMIT).forEach((t) => pushToNotificationList(userId, t))
			global[userId].fetched.value = true
		} catch (e) { global[userId].setError(e) }
		global[userId].setLoading(false)
	}

	useFetch(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchNotifications()
	})

	return { ...global[userId], fetchOlderNotifications: fetchNotifications }
}
