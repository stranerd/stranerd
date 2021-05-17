<template>
	<div>
		<div class="d-flex text-center align-items-center flex-wrap mb-1">
			<h5 class="fw-bold mb-0">
				Achievements
			</h5>
			<NuxtLink to="/account" class="ms-auto d-flex align-items-center">
				<span>More</span>
				<i class="fas fa-angle-right mx-0-25" />
			</NuxtLink>
		</div>
		<div class="thick" />
		<div v-for="achievement in ongoingAchievements" :key="achievement.id" class="achievement gap-0-5">
			<div class="achievement-image">
				<img :src="achievement.link" alt="">
			</div>
			<div class="achievement-title">
				<h6>{{ achievement.name }}</h6>
				<p>{{ achievement.description }}</p>
			</div>
			<div class="progress ms-auto">
				<div class="level" :style="`width: ${100 * achievement.progressInPercent }`" />
				<span class="text">{{ achievement.isLimitTo1 ? `Best: ${achievement.progress}` : `${achievement.progress} / ${achievement.limit}` }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AchievementsList',
	setup () {
		const { ongoingAchievements } = useAuth()
		return { ongoingAchievements }
	}
})
</script>

<style lang="scss" scoped>
.achievement {
	display: flex;
	align-items: flex-start;
	margin: 1rem 0;
	.achievement-image {
		img {
			width: 50px;
			height: 50px;
			border-radius: 0.75rem;
		}
	}
	.achievement-title {
		h6 {
			color: $color-blue;
			margin: 0;
		}
		p { margin: 0 }
	}
	.progress {
		margin-left: auto;
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
