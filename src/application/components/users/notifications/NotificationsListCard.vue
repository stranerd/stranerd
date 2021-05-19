<template>
	<div>
		{{ notification }}
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { NotificationEntity } from '@modules/users'
export default defineComponent({
	name: 'NotificationsListCard',
	props: {
		notification: {
			type: Object as PropType<NotificationEntity>,
			required: true
		}
	}
})
</script>
