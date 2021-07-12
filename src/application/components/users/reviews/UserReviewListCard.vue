<template>
	<div class=" d-flex flex-column pt-2 wrapper">
		<div class="review-head ml-1 d-flex align-items-center justify-content-between">
			<div class="left d-flex align-items-center">
				<Avatar src="@app/assets/images/icons/dashboard_hero.svg" :size="36" />
				<span class="name">Eniola Holmes</span>
				<span class="ratings ms-2" style="margin-right: 3px;"><i class="fas fa-star" style="color: #ffda20; font-size: 21px;" /></span>
				<span style="me-2">5/5</span>
				<span class="textStyle ms-2" style="font-size: 14px;">4 weeks ago</span>
			</div>
		</div>

		<div class="review-body ml-1 mr-2 mt-1">
			<span>Jerry is an awesome nerd... has the best method so far in helping me study...</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'ReviewListCard'
})
</script>
<style lang="scss" scoped>
	.review-body {
		span {
			margin: 32px 0;
			font-size: 16px;
		}
	}

	.review-head {
		.left {
			padding-top: 1rem;

			.name {
				margin-left: 6px;
				color: $color-dark;
				font-size: 17px;
				font-weight: 600;
			}

			.subject {
				color: $color-dark;
				font-weight: 600;
			}
		}
	}

	.textStyle {
		font-size: 16px;
		color: $color-dark;
	}

	.bl {
		border-bottom: 1px solid $color-line;
	}

	.tag {
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		border-radius: 50px;
		color: $color-dark;
		padding: 1px 14px;
	}

	.wrapper {
		border-bottom: 1px solid $color-line;
	}
</style>
