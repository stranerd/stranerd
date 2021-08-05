<template>
	<div class="notification gap-0-5 text-dark" @click="markSeen">
		<PageLoading v-if="loading" />
		<NuxtLink :to="notification.action" :class="{'text-primary-dark': !notification.seen}">
			<BodyText variant="large" class="main cursor-pointer">
				<DynamicText>{{ notification.body }}</DynamicText>
			</BodyText>
		</NuxtLink>
		<BodyText variant="sub">
			<DynamicText>{{ formatTime(notification.createdAt) }}</DynamicText>
		</BodyText>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
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
		const { loading, error, markNotificationSeen } = useNotification(props.notification)
		const markSeen = async () => {
			await markNotificationSeen()
		}
		return { loading, error, markSeen, formatTime }
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
