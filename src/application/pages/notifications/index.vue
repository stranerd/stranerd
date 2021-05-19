<template>
	<div class="page-content">
		<NotificationsList :key="id" :user-id="id" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import NotificationsList from '@app/components/users/notifications/NotificationsList.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'NotificationsPage',
	components: { NotificationsList },
	middleware: ['isAuthenticated'],
	setup () {
		const { id } = useAuth()
		return { id }
	}
})
</script>
