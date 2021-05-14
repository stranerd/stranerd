<template>
	<div>
		<h3>Achievements</h3>
		<div class="achievementList">
			<div v-for="achievement in user.achievements" :key="achievement.id" class="achievement gap-1" :class="{'completed': achievement.completed}">
				<div class="achievement-image">
					<img :src="achievement.link" alt="">
				</div>
				<div class="achievement-title">
					<h4>{{ achievement.name }}</h4>
					<p>{{ achievement.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
export default defineComponent({
	name: 'UserAchievementsList',
	props: {
		user: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
.achievementList {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 0.5rem;
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
		img {
			width: 50px;
			height: 50px;
			border-radius: 0.75rem;
		}
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
	color: $color-blue-grey;
	h4 { color: $color-blue; }
}
</style>
