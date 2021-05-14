<template>
	<div>
		<div class="grid">
			<template v-if="user.roles.isTutor">
				<div class="page-card">
					<div>
						<span class="card-title">Answers</span>
						<span class="card-sub">{{ formatNumber(Object.entries(user.meta.answers).length) }}</span>
					</div>
					<img src="@app/assets/images/icons/profile-answers.svg" alt="">
				</div>
				<div class="page-card">
					<div>
						<span class="card-title">Best Answers</span>
						<span class="card-sub">{{ formatNumber(Object.entries(user.meta.bestAnswers).length) }}</span>
					</div>
					<img src="@app/assets/images/icons/profile-best-answers.svg" alt="">
				</div>
				<div class="page-card">
					<div>
						<span class="card-title">Sessions</span>
						<span class="card-sub">{{ formatNumber(Object.entries(user.meta.tutorSessions).length) }}</span>
					</div>
					<img src="@app/assets/images/icons/profile-sessions.svg" alt="">
				</div>
			</template>
			<template v-else>
				<div class="page-card">
					<div>
						<span class="card-title">Questions</span>
						<span class="card-sub">{{ formatNumber(Object.entries(user.meta.questions).length) }}</span>
					</div>
					<img src="@app/assets/images/icons/profile-question.svg" alt="">
				</div>
				<div class="page-card">
					<div>
						<span class="card-title">Answered</span>
						<span class="card-sub">{{ formatNumber(Object.entries(user.meta.bestAnsweredQuestions).length) }}</span>
					</div>
					<img src="@app/assets/images/icons/profile-best-answers.svg" alt="">
				</div>
				<div class="page-card">
					<div>
						<span class="card-title">Sessions</span>
						<span class="card-sub">{{ formatNumber(Object.entries(user.meta.sessions).length) }}</span>
					</div>
					<img src="@app/assets/images/icons/profile-sessions.svg" alt="">
				</div>
			</template>
			<div class="page-card">
				<div>
					<span class="card-title">XP</span>
					<span class="card-sub">{{ user.account.xp }}</span>
				</div>
				<img src="@app/assets/images/icons/profile-rank.svg" alt="">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/commons'
export default defineComponent({
	name: 'UserProfileStats',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/layouts.scss';
.grid{
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 0.5rem;
	@media (min-width: $sm) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1050px) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (min-width: $lg) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1682px) {
		grid-template-columns: repeat(4, 1fr);
	}
}
.page-card {
	@extend .page-content;
	display: flex;
	justify-content: space-between;
	padding: 2rem;
	.card-title {
		display: block;
		margin: 0;
		font-size: 1.5rem;
	}
	.card-sub {
		display: block;
		font-weight: bold;
		margin: 0;
		font-size: 3rem;
	}
	img {
		width: 100px;
		height: 100px;
		margin: 0 0 0 0.5rem;
	}
}
</style>
