<template>
	<NuxtLink to="/notifications">
		<span class="position-relative">
			<img class="filter" src="@app/assets/images/icons/notification.svg" alt="">
			<i v-if="notifications.filter((n) => !n.seen).length > 0" class="fas fa-circle text-danger position-absolute" style="top: 0;right:0;font-size:0.6em" />
		</span>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useNotificationList } from '@app/hooks/users/notifications'
export default defineComponent({
	name: 'NotificationBell',
	setup () {
		const { notifications, listener } = useNotificationList()
		onMounted(() => {
			if (!listener.isRunning) listener.startListener()
		})
		return { notifications }
	}
})
</script>
