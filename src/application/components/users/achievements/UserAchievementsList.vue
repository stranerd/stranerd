<template>
	<div>
		<h3>Achievements</h3>
		<div class="achievementList">
			<div class="achievement" :class="{'completed': askQuestionAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ askQuestionAchievement.name }}</h4>
					<p>{{ askQuestionAchievement.description }}</p>
				</div>
			</div>
			<div class="achievement" :class="{'completed': streak7DaysAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ streak7DaysAchievement.name }}</h4>
					<p>{{ streak7DaysAchievement.description }}</p>
				</div>
			</div>
			<div class="achievement" :class="{'completed': buyGoldAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ buyGoldAchievement.name }}</h4>
					<p>{{ buyGoldAchievement.description }}</p>
				</div>
			</div>
			<div class="achievement" :class="{'completed': buyBronzeAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ buyBronzeAchievement.name }}</h4>
					<p>{{ buyBronzeAchievement.description }}</p>
				</div>
			</div>
			<div class="achievement" :class="{'completed': attendSessionsAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ attendSessionsAchievement.name }}</h4>
					<p>{{ attendSessionsAchievement.description }}</p>
				</div>
			</div>
			<div class="achievement" :class="{'completed': tipNerdAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ tipNerdAchievement.name }}</h4>
					<p>{{ tipNerdAchievement.description }}</p>
				</div>
			</div>
			<div class="achievement" :class="{'completed': dailyFinishAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ dailyFinishAchievement.name }}</h4>
					<p>{{ dailyFinishAchievement.description }}</p>
				</div>
			</div>
			<div class="achievement" :class="{'completed': weeklyFinishAchievement.completed}">
				<div class="achievement-image" />
				<div class="achievement-title">
					<h4>{{ weeklyFinishAchievement.name }}</h4>
					<p>{{ weeklyFinishAchievement.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Achievements, UserEntity } from '@modules/users'
export default defineComponent({
	name: 'ProfileAchievementsList',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const askQuestionAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.ASK_QUESTIONS.id),
			set: () => {}
		})
		const streak7DaysAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.STREAK_7_DAYS.id),
			set: () => {}
		})
		const buyGoldAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.BUY_GOLD.id),
			set: () => {}
		})
		const buyBronzeAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.BUY_BRONZE.id),
			set: () => {}
		})
		const attendSessionsAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.ATTEND_SESSIONS.id),
			set: () => {}
		})
		const tipNerdAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.TIP_NERDS.id),
			set: () => {}
		})
		const dailyFinishAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.DAILY_FINISH.id),
			set: () => {}
		})
		const weeklyFinishAchievement = computed({
			get: () => props.user.achievements.find((a) => a.id === Achievements.WEEKLY_FINISH.id),
			set: () => {}
		})
		return {
			askQuestionAchievement, streak7DaysAchievement, buyGoldAchievement, buyBronzeAchievement,
			attendSessionsAchievement, tipNerdAchievement, dailyFinishAchievement, weeklyFinishAchievement
		}
	}
})
</script>

<style lang="scss" scoped>
.achievementList {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-column-gap: 0.5rem;
	grid-row-gap: 0.5rem;
	@media (min-width: $sm) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: $md) {
		grid-template-columns: repeat(4, 1fr);
	}
}
.achievement {
	display: flex;
	align-items: center;
	.achievement-image {
		background: lighten($color-grey, 30);
		border-radius: 1rem;
		margin-right: 0.5rem;
		width: 60px;
		height: 60px;
	}
	.achievement-title {
		color: $color-grey;
		h4 {
			font-size: 1.125rem;
			margin: 0;
		}
		p {
			font-size: 0.9rem;
			margin: 0;
		}
	}
}
.completed {
	.achievement-image { background: $color-blue-grey; }
	color: $color-blue-grey;
	h4 { color: $color-blue; }
}
</style>
