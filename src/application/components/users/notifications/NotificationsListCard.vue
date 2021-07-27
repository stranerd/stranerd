<template>
	<div class="notification gap-0-5 text-dark">
		<PageLoading v-if="loading" />
		<BodyText variant="large" class="main cursor-pointer" :class="{'fw-bold': !notification.seen}" @click.prevent="click">
			<DynamicText>{{ notification.body }}</DynamicText>
		</BodyText>
		<BodyText variant="sub">
			<DynamicText>{{ formatTime(notification.createdAt) }}</DynamicText>
		</BodyText>
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
	}
</style>
