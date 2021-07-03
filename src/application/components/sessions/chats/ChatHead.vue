<template>
	<div class="d-flex py-0-25 align-items-center position-relative">
		<NuxtLink to="/messages" class="me-0-5">
			<i class="fas fa-arrow-left" />
		</NuxtLink>
		<NuxtLink :to="`/users/${user.id}`">
			<Avatar :src="user.avatar" :size="40" />
		</NuxtLink>
		<div class="ms-0-5 me-auto">
			<NuxtLink :to="`/users/${user.id}`" class="d-block text-wrap">
				<span class="fw-bold">{{ user.fullName }}</span>
			</NuxtLink>
			<span class="small">{{ user.isOnline ? 'Active now' : time }}</span>
		</div>
		<span v-if="isAccepted && currentSessionId === user.currentSession" class="lead ms-0-5">{{ countDown }}</span>
		<button class="btn navbar-toggler ms-0-5" @click="show = !show">
			<i class="fas fa-ellipsis-v" />
		</button>
		<div v-if="show" class="under" @click="show = false" />
		<div v-if="show" class="menu gap-0-5">
			<a v-if="!currentSessionId && !user.currentSession" @click.prevent="requestNewSession">Request Session</a>
			<a @click="tipUser">Tip Nerd</a>
			<a @click="reportUser">Report</a>
			<PageLoading v-if="loading" />
			<a v-if="isAccepted && currentSession && currentSessionId === user.currentSession && currentSession.studentId === id" @click.prevent="cancelSession">End Session</a>
			<DisplayError :error="error" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { useCountdown, useTimeDifference } from '@app/hooks/core/dates'
import { setNewSessionTutorIdBio, useSession, setOtherParticipantId } from '@app/hooks/sessions/sessions'
import { useAccountModal, useSessionModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useCurrentSession } from '@app/hooks/sessions/session'
import { setReportedBioAndId } from '@app/hooks/forms/reports'
import { setNerdBioAndId } from '@app/hooks/users/account'
import { analytics } from '@modules/core/services/initFirebase'
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
		const { currentSession, endDate, isAccepted, otherParticipant } = useCurrentSession()
		const { diffInSec, startTimer: startCountdown, stopTimer: stopCountdown } = useCountdown(endDate.value, {
			0: useSessionModal().openRatings
		})
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
			setNewSessionTutorIdBio({ id: props.user.id, user: props.user.bio })
			useSessionModal().openCreateSession()
			show.value = false
		}
		const { cancelSession: c, loading, error } = useSession()
		const cancelSession = async () => {
			show.value = false
			await c()
			analytics.logEvent('session_cancelled', {
				sessionId: currentSessionId.value,
				duration: currentSession.value?.duration ?? 0,
				lasted: (currentSession.value?.duration ?? 0) - (diffInSec.value / 60)
			})
		}
		const reportUser = () => {
			setReportedBioAndId({ id: props.user.id, bio: props.user.bio })
			useAccountModal().openReportUser()
			show.value = false
		}
		const tipUser = () => {
			setNerdBioAndId({ id: props.user.id, bio: props.user.bio })
			useAccountModal().openTipTutor()
			show.value = false
		}
		if (otherParticipant.value.id) setOtherParticipantId(otherParticipant.value.id)
		return {
			id, currentSessionId, currentSession, isAccepted,
			show, time, diffInSec, countDown, requestNewSession,
			cancelSession, loading, error, reportUser, tipUser
		}
	}
})
</script>

<style lang="scss" scoped>
.under {
	position: fixed;
	width: 100vw;
	height: vh(100);
	left: 0;
	top: 0;
}
.menu {
	padding: 0.5rem;
	position: absolute;
	top: 2.5rem;
	right: 0;
	width: 250px;
	z-index: 1;
	display: flex;
	flex-direction: column;
	background: rgba($color-blue, 0.9);
	color: $color-white;
	border-radius: 0.5rem;
	a:hover {
		font-size: unset;
		transform: unset;
		background: lighten($color-blue, 5)
	}
	animation: slide-down 0.1s;
}
@keyframes slide-down {
	from { top: -50px; }
	to { top: 0; }
}
</style>
