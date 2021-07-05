<template>
	<div class="p-1">
		<template v-if="isLoggedIn">
			<ProfileHeadCard :user="user" />
			<div class="thick mx-n1" />
			<div class="d-flex flex-column">
				<h1 class="ranking-header">
					Ranking Up
				</h1>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-question.svg" class="me-0-75" height="24" width="24"> Questions</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.questions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-best-answers.svg" class="me-0-75" height="24" width="24"> Answered</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.bestAnsweredQuestions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-answers.svg" class="me-0-75" height="24" width="24"> Answers</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.answers.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-best-answers.svg" class="me-0-75" height="24" width="24"> Best Answers</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.bestAnswers.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-sessions.svg" class="me-0-75" height="24" width="24"> Sessions Hosted</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.tutorSessions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-sessions.svg" class="me-0-75" height="24" width="24"> Sessions Attended</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.sessions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/user.svg" class="me-0-75" height="24" width="24"> Member Since</span>
					<p class="fw-bold">
						{{ formatTime(new Date(user.dates.signedUpAt), true) }}
					</p>
				</div>
			</div>
			<div class="thick mx-n1" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/commons'
import { formatTime } from '@utils/dates'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'RightSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		return { id, isLoggedIn, user, formatNumber, formatTime }
	}
})
</script>

<style lang="scss" scoped>
	.ranking-header {
		text-align: center;
		font-size: 24px;
		color: $color-text-main;
	}
</style>
