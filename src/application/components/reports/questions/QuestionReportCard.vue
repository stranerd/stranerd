<template>
	<div class="wrapper mb-1">
		<div class="d-flex flex-row flex-sm-wrap flex-md-nowrap">
			<div class="d-flex flex-column py-1 px-md-2 px-1 " style="width: 100%;">
				<div class="p-custom">
					From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the hori zontal plane at a speed of 21 m/s. Calculate the total time the ball is in the air?
				</div>
				<div class="p-custom pt-1">
					Reported by <span class="text-primary text-small">Eniola Holmes</span>
				</div>
				<div class="p-custom pt-1" style="font-size: 14px;">
					This question contains offensive content.
				</div>
			</div>
			<div class="text-danger text-center ml-auto px-2 py-1 sideBorder d-none d-md-flex ">
				<a style="font-size: 14px;">
					Delete Question
				</a>
			</div>
			<div class="text-danger px-1 pt-0 pb-1 d-md-none d-block col-12 ">
				<a style="font-size: 13px;">
					Delete Question
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'QuestionReportCard'
})
</script>
<style lang="scss" scoped>
	.p-custom {
		font-size: 15px;
		color: $color-dark;
	}

	.wrapper {
		border: 1px solid $color-line;
		border-radius: 5px;
		background-color: $color-tags;
	}

	.sideBorder {
		border-left: 1px solid $color-line;
		min-width: 200px;
	}

	.ml-auto {
		margin-left: auto;
	}

</style>
