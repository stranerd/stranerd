<template>
	<div class="d-flex flex-column flex-lg-row align-items-center">
		<div class="d-flex flex-column flex-lg-row align-items-center my-1">
			<div class="position-relative">
				<Avatar :src="user.avatar" :size="75" />
				<i class="fas fa-circle position-absolute border" style="right: 0; bottom: 8px;" :class="user.isOnline ? 'text-success' : 'text-grey'" />
			</div>
			<div class="ms-1 align-items-center align-items-lg-start d-flex flex-column">
				<span class="d-block text-18 fw-bold text-wrap">{{ user.fullName }}</span>
				<span class="small mb-1">{{ user.isOnline ? 'Active now' : 'Last seen: ' + time }}</span>
				<ShowRatings v-if="user.roles.isTutor" :rating="user.averageRating" />
				<NuxtLink :to="`/messages/${user.id}`" class="btn btn-sm btn-blue my-1">
					Message
				</NuxtLink>
			</div>
		</div>
		<div class="grid ms-lg-auto my-1">
			<template v-if="user.roles.isTutor">
				<div class="stats">
					<img src="@app/assets/images/icons/profile-answers.svg" alt="">
					<span>Answers</span>
					<span class="count">{{ formatNumber(Object.entries(user.meta.answers).length) }}</span>
				</div>
				<div class="stats">
					<img src="@app/assets/images/icons/profile-best-answers.svg" alt="">
					<span>Best Answers</span>
					<span class="count">{{ formatNumber(Object.entries(user.meta.bestAnswers).length) }}</span>
				</div>
				<div class="stats">
					<img src="@app/assets/images/icons/profile-sessions.svg" alt="">
					<span>Sessions</span>
					<span class="count">{{ formatNumber(Object.entries(user.meta.tutorSessions).length) }}</span>
				</div>
			</template>
			<template v-else>
				<div class="stats">
					<img src="@app/assets/images/icons/profile-question.svg" alt="">
					<span>Questions</span>
					<span class="count">{{ formatNumber(Object.entries(user.meta.questions).length) }}</span>
				</div>
				<div class="stats">
					<img src="@app/assets/images/icons/profile-best-answers.svg" alt="">
					<span>Answered</span>
					<span class="count">{{ formatNumber(Object.entries(user.meta.bestAnsweredQuestions).length) }}</span>
				</div>
				<div class="stats">
					<img src="@app/assets/images/icons/profile-sessions.svg" alt="">
					<span>Sessions</span>
					<span class="count">{{ formatNumber(Object.entries(user.meta.sessions).length) }}</span>
				</div>
			</template>
			<div class="stats">
				<img src="@app/assets/images/icons/profile-rank.svg" alt="">
				<span>Xp</span>
				<span class="count">{{ formatNumber(user.account.xp) }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/commons'
import { useTimeDifference } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'UserHeadCard',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup (props) {
		const { time, startTimer, stopTimer } = useTimeDifference(props.user.lastSeen)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { time, formatNumber }
	}
})
</script>

<style lang="scss" scoped>
.grid {
	display: grid;
	width: 100%;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 2rem;
	grid-row-gap: 2rem;
	@media (min-width: $sm) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (min-width: $lg) {
		width: auto;
	}
}
.stats {
	display: flex;
	flex-direction: column;
	align-items: center;
	img {
		width: 36px;
		height: 36px;
		margin-bottom: 0.5rem;
	}
	.count {
		font-size: 1.5rem;
	}
}
</style>
