<template>
	<div class=" d-flex flex-column pt-2">
		<div class="mb-1">
			<h2 class="headerStyle">
				Similar Questions
			</h2>
		</div>
		<div class="pt-2 pb-1 borderBottom">
			<span class="questionStyle">
				From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s. Calculate the total time the ball is in the air?
			</span>
		</div>
		<div class="pt-2 pb-1 borderBottom">
			<span class="questionStyle">
				From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s. Calculate the total time the ball is in the air?
			</span>
		</div>
		<div class="pt-2 pb-1 borderBottom">
			<span class="questionStyle">
				From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s. Calculate the total time the ball is in the air?
			</span>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'SimilarQuestions'
})
</script>
<style lang="scss" scoped>
	.headerStyle {
		font-weight: bolder;
		color: $color-text-main;
	}

	.questionStyle {
		font-size: 16px;
		color: $color-text-sub;
	}

	.borderBottom {
		border-bottom: 1px solid $color-line;
	}
</style>
