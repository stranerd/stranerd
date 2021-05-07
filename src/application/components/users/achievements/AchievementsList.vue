<template>
	<div>
		<div class="d-flex text-center align-items-center flex-wrap mb-2">
			<h5 class="fw-bold mb-0">
				Achievements
			</h5>
			<NuxtLink to="/account" class="ms-auto d-flex align-items-center">
				<span>More</span>
				<i class="fas fa-angle-right mx-half" />
			</NuxtLink>
		</div>
		<div class="thick" />
		<div>
			<div v-if="askQuestionAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="askQuestionAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ askQuestionAchievement.name }}</h6>
					<p>{{ askQuestionAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${100 * askQuestionAchievement.progress / askQuestionAchievement.limit }`" />
					<span class="text">{{ askQuestionAchievement.progress }} / {{ askQuestionAchievement.limit }}</span>
				</div>
			</div>
			<div v-if="streak7DaysAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="streak7DaysAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ streak7DaysAchievement.name }}</h6>
					<p>{{ streak7DaysAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${100 * streak7DaysAchievement.progress / streak7DaysAchievement.limit }`" />
					<span class="text">{{ streak7DaysAchievement.progress }} / {{ streak7DaysAchievement.limit }}</span>
				</div>
			</div>
			<div v-if="buyGoldAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="buyGoldAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ buyGoldAchievement.name }}</h6>
					<p>{{ buyGoldAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${100 * buyGoldAchievement.progress / buyGoldAchievement.limit }`" />
					<span class="text">{{ buyGoldAchievement.progress }} / {{ buyGoldAchievement.limit }}</span>
				</div>
			</div>
			<div v-if="buyBronzeAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="buyBronzeAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ buyBronzeAchievement.name }}</h6>
					<p>{{ buyBronzeAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${100 * buyBronzeAchievement.progress / buyBronzeAchievement.limit }`" />
					<span class="text">{{ buyBronzeAchievement.progress }} / {{ buyBronzeAchievement.limit }}</span>
				</div>
			</div>
			<div v-if="attendSessionsAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="attendSessionsAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ attendSessionsAchievement.name }}</h6>
					<p>{{ attendSessionsAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${100 * attendSessionsAchievement.progress / attendSessionsAchievement.limit }`" />
					<span class="text">{{ attendSessionsAchievement.progress }} / {{ attendSessionsAchievement.limit }}</span>
				</div>
			</div>
			<div v-if="tipNerdAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="tipNerdAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ tipNerdAchievement.name }}</h6>
					<p>{{ tipNerdAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${100 * tipNerdAchievement.progress / tipNerdAchievement.limit }`" />
					<span class="text">{{ tipNerdAchievement.progress }} / {{ tipNerdAchievement.limit }}</span>
				</div>
			</div>
			<div v-if="dailyFinishAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="dailyFinishAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ dailyFinishAchievement.name }}</h6>
					<p>{{ dailyFinishAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${dailyFinishAchievement.progress === 0 ? 0 : 100 * dailyFinishAchievement.limit / dailyFinishAchievement.progress }`" />
					<span class="text">{{ dailyFinishAchievement.progress }}</span>
				</div>
			</div>
			<div v-if="weeklyFinishAchievement" class="achievement">
				<div class="achievement-image">
					<img :src="weeklyFinishAchievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h6>{{ weeklyFinishAchievement.name }}</h6>
					<p>{{ weeklyFinishAchievement.description }}</p>
				</div>
				<div class="progress ms-auto">
					<div class="level" :style="`width: ${weeklyFinishAchievement.progress === 0 ? 0 : 100 * weeklyFinishAchievement.limit / weeklyFinishAchievement.progress }`" />
					<span class="text">{{ weeklyFinishAchievement.progress }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { Achievements } from '@modules/users'
export default defineComponent({
	name: 'AchievementsList',
	setup () {
		const { ongoingAchievements } = useAuth()
		const askQuestionAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.ASK_QUESTIONS.id),
			set: () => {}
		})
		const streak7DaysAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.STREAK_7_DAYS.id),
			set: () => {}
		})
		const buyGoldAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.BUY_GOLD.id),
			set: () => {}
		})
		const buyBronzeAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.BUY_BRONZE.id),
			set: () => {}
		})
		const attendSessionsAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.ATTEND_SESSIONS.id),
			set: () => {}
		})
		const tipNerdAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.TIP_NERDS.id),
			set: () => {}
		})
		const dailyFinishAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.DAILY_FINISH.id),
			set: () => {}
		})
		const weeklyFinishAchievement = computed({
			get: () => ongoingAchievements.value.find((a) => a.id === Achievements.WEEKLY_FINISH.id),
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
	margin: 1rem 0;
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
		h6 {
			color: $color-blue;
			margin: 0;
		}
		p { margin: 0 }
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
