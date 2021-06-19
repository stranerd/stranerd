<template>
	<div class="d-flex flex-column gap-0-5">
		<PageLoading v-if="loading" />
		<a @click.prevent="click">
			<span :class="{'fw-bold': !notification.seen}">{{ notification.body }}</span>
		</a>
		<span class="small">{{ formatTime(notification.createdAt) }}</span>
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
