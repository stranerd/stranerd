<template>
	<div>
		<div class="page-content">
			<NotificationsList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import NotificationsList from '@app/components/users/notifications/NotificationsList.vue'
export default defineComponent({
	name: 'NotificationsPage',
	components: { NotificationsList },
	middleware: ['isAuthenticated']
})
</script>
