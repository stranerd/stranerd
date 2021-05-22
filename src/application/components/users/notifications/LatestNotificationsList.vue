<template>
	<div>
		<h3>Notifications</h3>
		<div class="thin" />
		<div v-for="notification in notifications.slice(0, 5)" :key="notification.id">
			<NotificationsListCard :notification="notification" />
			<div class="thin" />
		</div>
		<div v-if="hasMore" class="text-center py-0-5 text-18">
			<NuxtLink class="fw-bold" to="/notifications">
				View All
			</NuxtLink>
		</div>
		<DisplayWarning v-if="!loading && !error && notifications.length === 0" message="No new notifications." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useNotificationList } from '@app/hooks/users/notifications'
import NotificationsListCard from '@app/components/users/notifications/NotificationsListCard.vue'
export default defineComponent({
	name: 'LatestNotificationsList',
	components: { NotificationsListCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { notifications, error, loading, listener, hasMore, fetchOlderNotifications } = useNotificationList(props.userId)
		onMounted(() => {
			if (!listener.value) listener.startListener()
		})
		return { notifications, error, loading, hasMore, fetchOlderNotifications }
	}
})
</script>
