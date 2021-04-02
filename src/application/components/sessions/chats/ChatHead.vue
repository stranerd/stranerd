<template>
	<div class="d-flex py-half align-items-center">
		<NuxtLink :to="`/users/${user.id}`">
			<Avatar :src="user.avatar" :size="40" />
		</NuxtLink>
		<div class="ml-1 mr-auto">
			<NuxtLink :to="`/users/${user.id}`" class="d-block text-wrap">
				<span class="font-weight-bold">{{ user.fullName }}</span>
			</NuxtLink>
			<span class="small">{{ user.isOnline ? 'Active now' : time }}</span>
		</div>
		<template v-if="getCurrentSession && getCurrentSession.id === user.currentSession">
			<span class="lead ml-1">{{ countDown }}</span>
		</template>
		<template v-else-if="user.roles.isTutor">
			<span v-if="!getCurrentSession && !user.currentSession && user.isOnline" class="btn btn-sm ml-1 cursor-pointer">Request Session</span>
			<span class="btn btn-sm ml-1">Tip Nerd</span>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { useCountdown, useTimeDifference } from '@app/hooks/core/dates'
import { getCurrentSession } from '@app/hooks/sessions/session'
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
		const { diffInSec, startTimer: startCountdown, stopTimer: stopCountdown } = useCountdown(getCurrentSession.value?.endedAt ?? 0)
		onMounted(() => {
			startTimer()
			startCountdown()
		})
		onBeforeUnmount(() => {
			stopTimer()
			stopCountdown()
		})
		const countDown = computed({
			get: () => {
				const hours = Math.floor(diffInSec.value / 3600)
				const minutes = Math.floor((diffInSec.value % 3600) / 60)
				const seconds = Math.floor(diffInSec.value % 60)
				let hr = ''
				if (hours) hr = `${hours < 10 ? '0' + hours : hours}:`
				const rest = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
				return hr + rest
			},
			set: () => {}
		})
		return { time, getCurrentSession, diffInSec, countDown }
	}
})
</script>
