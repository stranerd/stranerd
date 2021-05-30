<template>
	<div id="achievements">
		<h2 class="fw-bold">
			Achievements
		</h2>
		<div class="thick" />
		<div v-for="achievement in user.achievements" :key="achievement.id" class="achievement gap-0-5">
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
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
export default defineComponent({
	name: 'ProfileAchievementsList',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
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
		img {
			width: 50px;
			height: 50px;
			border-radius: 0.75rem;
		}
	}
	.achievement-title {
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
