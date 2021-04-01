<template>
	<div class="d-flex py-half align-items-center">
		<NuxtLink :to="`/users/${user.id}`">
			<Avatar :src="user.avatar" :size="40" />
		</NuxtLink>
		<div class="mx-1">
			<NuxtLink :to="`/users/${user.id}`" class="d-block text-wrap">
				<span class="font-weight-bold">{{ user.fullName }}</span>
			</NuxtLink>
			<span class="small">{{ user.isOnline ? 'Active now' : time }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { useTimeDifference } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'ChatHead',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const { time, startTimer, stopTimer } = useTimeDifference(props.user.lastSeen)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { time }
	}
})
</script>
