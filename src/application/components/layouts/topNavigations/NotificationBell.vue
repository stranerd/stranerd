<template>
	<NuxtLink to="/notifications" class="position-relative">
		<img src="@app/assets/images/icons/notification.svg" alt="">
		<i v-if="notifications.filter((n) => !n.seen).length > 0" class="fas fa-circle text-danger position-absolute small" style="right:12px;" />
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
			if (!listener.value) listener.startListener()
		})
		return { notifications }
	}
})
</script>
