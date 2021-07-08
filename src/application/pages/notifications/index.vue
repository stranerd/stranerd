<template>
	<div>
		<div class="notification-body">
			<h1>Notifications</h1>

			<div v-for="n in 10" :key="n" class="notification-content mx-3 py-1">
				<span class="main">
					You have successfully booked a Tutor.
				</span>
				<span class="sub">
					3 mins ago.
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import NotificationsList from '@app/components/users/notifications/NotificationsList.vue'
export default defineComponent({
	name: 'NotificationsPage',
	// components: { NotificationsList },
	layout: 'default',
	middleware: ['isAuthenticated']
})
</script>

<style lang="scss" scoped>
	.notification-body {
		background: $color-white;
		border: 1px solid $color-line;
		margin-top: 36px;
		width: 960px;
		max-width: 100%;
		border-radius: 6px;

		h1 {
			padding: 36px;
			color: $color-text-main;
			border-bottom: 1px solid $color-line;
			font-size: 36px;
		}

		.notification-content {
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid $color-line;
			margin-bottom: 1rem;

			.main {
				color: $color-text-main;
				font-size: 1.25rem;
			}

			.sub {
				color: $color-text-sub;
				font-size: 1rem;
			}
		}
	}
</style>
