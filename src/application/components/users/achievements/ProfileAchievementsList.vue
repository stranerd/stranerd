<template>
	<div>
		<h2 class="fw-bold">
			Achievements
		</h2>
		<div class="thick" />
		<div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="askQuestionAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ askQuestionAchievement.name }}</h4>
					<p>{{ askQuestionAchievement.description }}</p>
				</div>
				<i v-if="askQuestionAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${100 * askQuestionAchievement.progress / askQuestionAchievement.limit }`" />
					<span class="text">{{ askQuestionAchievement.progress }} / {{ askQuestionAchievement.limit }}</span>
				</div>
			</div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="streak7DaysAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ streak7DaysAchievement.name }}</h4>
					<p>{{ streak7DaysAchievement.description }}</p>
				</div>
				<i v-if="streak7DaysAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${100 * streak7DaysAchievement.progress / streak7DaysAchievement.limit }`" />
					<span class="text">{{ streak7DaysAchievement.progress }} / {{ streak7DaysAchievement.limit }}</span>
				</div>
			</div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="buyGoldAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ buyGoldAchievement.name }}</h4>
					<p>{{ buyGoldAchievement.description }}</p>
				</div>
				<i v-if="buyGoldAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${100 * buyGoldAchievement.progress / buyGoldAchievement.limit }`" />
					<span class="text">{{ buyGoldAchievement.progress }} / {{ buyGoldAchievement.limit }}</span>
				</div>
			</div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="buyBronzeAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ buyBronzeAchievement.name }}</h4>
					<p>{{ buyBronzeAchievement.description }}</p>
				</div>
				<i v-if="buyBronzeAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${100 * buyBronzeAchievement.progress / buyBronzeAchievement.limit }`" />
					<span class="text">{{ buyBronzeAchievement.progress }} / {{ buyBronzeAchievement.limit }}</span>
				</div>
			</div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="attendSessionsAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ attendSessionsAchievement.name }}</h4>
					<p>{{ attendSessionsAchievement.description }}</p>
				</div>
				<i v-if="attendSessionsAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${100 * attendSessionsAchievement.progress / attendSessionsAchievement.limit }`" />
					<span class="text">{{ attendSessionsAchievement.progress }} / {{ attendSessionsAchievement.limit }}</span>
				</div>
			</div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="tipNerdAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ tipNerdAchievement.name }}</h4>
					<p>{{ tipNerdAchievement.description }}</p>
				</div>
				<i v-if="tipNerdAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${100 * tipNerdAchievement.progress / tipNerdAchievement.limit }`" />
					<span class="text">{{ tipNerdAchievement.progress }} / {{ tipNerdAchievement.limit }}</span>
				</div>
			</div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="dailyFinishAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ dailyFinishAchievement.name }}</h4>
					<p>{{ dailyFinishAchievement.description }}</p>
				</div>
				<i v-if="dailyFinishAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${dailyFinishAchievement.progress === 0 ? 0 : 100 * dailyFinishAchievement.limit / dailyFinishAchievement.progress }`" />
					<span class="text">#{{ dailyFinishAchievement.progress }}</span>
				</div>
			</div>
			<div class="achievement">
				<div class="achievement-image">
					<img :src="weeklyFinishAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ weeklyFinishAchievement.name }}</h4>
					<p>{{ weeklyFinishAchievement.description }}</p>
				</div>
				<i v-if="weeklyFinishAchievement.completed" class="fas fa-check-circle" />
				<div v-else class="progress ms-auto">
					<div class="level" :style="`width: ${weeklyFinishAchievement.progress === 0 ? 0 : 100 * weeklyFinishAchievement.limit / weeklyFinishAchievement.progress }`" />
					<span class="text">#{{ weeklyFinishAchievement.progress }}</span>
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
.achievement {
	display: flex;
	align-items: flex-start;
	margin: 1.5rem 0;
	.achievement-image {
		margin-right: 0.75rem;
		img {
			width: 50px;
			height: 50px;
			border-radius: 0.75rem;
		}
	}
	.achievement-title {
		margin: 0 0.5rem 0 0;
		h4 {
			color: $color-blue;
			margin: 0;
		}
		p { margin: 0 }
	}
	i {
		font-size: 3rem;
		color: $color-green;
		margin: 0 0 0 auto;
	}
	.progress {
		margin: 0 0 0 auto;
		background: lighten($color-blue, 40%);
		color: $color-white;
		width: 40%;
		height: 25px;
		min-width: 120px;
		max-width: 300px;
		position: relative;
		border-radius: 10rem;
		display: flex;
		align-items: center;
		.level {
			background: $color-blue;
			height: 100%;
		}
		.text {
			width: 100%;
			z-index: 1;
			text-align: center;
			position: absolute;
		}
	}
}
</style>
