<template>
	<div class="d-flex flex-column align-items-center">
		<img :src="user.image" alt="" class="profile-image">
		<h3 class="my-1 text-center">
			{{ user.name }}
		</h3>
		<span>
			<i class="fas fa-circle" :class="{'text-success': user.isOnline}" />
			<span>{{ user.isOnline ? 'Online' : `Last seen: ${time}` }}</span>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { useTimeDifference } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'UserProfileCard',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const { time, startTimer, stopTimer } = useTimeDifference(props.user.lastSeen)
		onMounted(() => {
			startTimer()
		})
		onBeforeUnmount(() => {
			stopTimer()
		})
		return { time }
	}
})
</script>

<style lang="scss" scoped>
.profile-image {
	width: 5rem;
	height: 5rem;
	@media (min-width: $md) {
		width: 6.25rem;
		height: 6.25rem;
	}
	@media (min-width: $lg) {
		width: 7.5rem;
		height: 7.5rem;
	}
}
</style>
