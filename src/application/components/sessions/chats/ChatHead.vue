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
		<span v-if="isAccepted && currentSessionId === user.currentSession" class="lead ml-1">{{ countDown }}</span>
		<div class="position-relative">
			<button class="btn navbar-toggler ml-1" @click="show = !show">
				<i class="fas fa-ellipsis-v" />
			</button>
			<div v-if="show" class="menu">
				<template v-if="user.roles.isTutor">
					<a v-if="!currentSessionId && !user.currentSession" @click.prevent="requestNewSession">Request Session</a>
					<a>Tip Nerd</a>
				</template>
				<a>Report</a>
				<PageLoading v-if="loading" />
				<a v-if="isAccepted && currentSession && currentSessionId === user.currentSession && currentSession.studentId === id" @click.prevent="cancelSession">End Session</a>
				<DisplayError :error="error" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { useCountdown, useTimeDifference } from '@app/hooks/core/dates'
import { setNewSessionTutorIdBio, useSession } from '@app/hooks/sessions/sessions'
import { useSessionModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useCurrentSession } from '@app/hooks/sessions/session'
export default defineComponent({
	name: 'ChatHead',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const show = ref(false)
		const { time, startTimer, stopTimer } = useTimeDifference(props.user.lastSeen)
		const { id, currentSessionId } = useAuth()
		const { currentSession, endDate, isAccepted } = useCurrentSession()
		const { diffInSec, startTimer: startCountdown, stopTimer: stopCountdown } = useCountdown(endDate.value)
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
		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.user.id, user: props.user.userBio })
			useSessionModal().setSessionModalCreateSession()
			show.value = false
		}
		const { cancelSession: c, loading, error } = useSession()
		const cancelSession = async () => {
			show.value = false
			await c()
		}
		return {
			id, currentSessionId, currentSession, isAccepted,
			show, time, diffInSec, countDown, requestNewSession,
			cancelSession, loading, error
		}
	}
})
</script>

<style lang="scss" scoped>
.menu {
	padding: 0.5rem;
	position: absolute;
	right: 0;
	width: 200px;
	z-index: 1;
	display: flex;
	flex-direction: column;
	background: rgba($color-blue, 0.9);
	color: $color-white;
	border-radius: 0.5rem;
	* {
		padding: 0.5rem 0;
	}
	a:hover {
		font-size: unset;
		transform: unset;
		background: lighten($color-blue, 5)
	}
}
</style>
