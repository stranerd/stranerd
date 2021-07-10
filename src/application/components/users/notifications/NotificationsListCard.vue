<template>
	<div class="notification gap-0-5">
		<PageLoading v-if="loading" />
		<span class="main cursor-pointer" @click.prevent="click">
			<span :class="{'fw-bold': !notification.seen}">{{ notification.body }}</span>
		</span>
		<span class="sub">{{ formatTime(notification.createdAt) }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useNotification } from '@app/hooks/users/notifications'
export default defineComponent({
	name: 'NotificationsListCard',
	props: {
		notification: {
			type: Object as PropType<NotificationEntity>,
			required: true
		}
	},
	setup (props) {
		const router = useRouter()
		const { loading, error, markNotificationSeen } = useNotification(props.notification)
		const click = async () => {
			await markNotificationSeen()
			await router.push(props.notification.action)
		}
		return { loading, error, click, formatTime }
	}
})
</script>

<style lang="scss" scoped>
	.notification {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid $color-line;
		padding: 1.5rem 0;

		.main {
			color: $color-text-main;
			font-size: 1.25rem;
		}

		.sub {
			color: $color-text-sub;
			font-size: 1rem;
		}
	}
</style>
