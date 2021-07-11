<template>
	<div>
		<div class="notification-body">
			<h1>Notifications</h1>
			<NotificationsList class="px-3" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import NotificationsList from '@app/components/users/notifications/NotificationsList.vue'
export default defineComponent({
	name: 'NotificationsPage',
	components: { NotificationsList },
	layout: 'default',
	middleware: ['isAuthenticated']
})
</script>

<style lang="scss" scoped>
	.notification-body {
		background: $color-white;
		border: 1px solid $color-line;
		border-radius: 6px;

		h1 {
			padding: 2.25rem;
			margin: 0;
			color: $color-dark;
			border-bottom: 1px solid $color-line;
			font-size: 36px;
		}
	}
</style>
