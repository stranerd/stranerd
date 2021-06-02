<template>
	<div>
		<h2>Notifications</h2>
		<div class="thick" />
		<div v-for="notification in notifications" :key="notification.id">
			<NotificationsListCard :notification="notification" />
			<div class="thick" />
		</div>
		<div v-if="hasMore" class="text-center py-0-5 text-18">
			<a class="fw-bold" @click.prevent="fetchOlderNotifications">LOAD MORE</a>
		</div>
		<DisplayWarning v-if="!loading && !error && notifications.length === 0" message="No notifications found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useNotificationList } from '@app/hooks/users/notifications'
import NotificationsListCard from '@app/components/users/notifications/NotificationsListCard.vue'
export default defineComponent({
	name: 'NotificationsList',
	components: { NotificationsListCard },
	setup () {
		const { notifications, error, loading, listener, hasMore, fetchOlderNotifications } = useNotificationList()
		onMounted(() => {
			if (!listener.value) listener.startListener()
		})
		return { notifications, error, loading, hasMore, fetchOlderNotifications }
	}
})
</script>
