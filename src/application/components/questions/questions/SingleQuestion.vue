<template>
	<div class=" d-flex flex-column pt-2 wrapper">
		<div class="question-head ml-1 d-flex align-items-center justify-content-between">
			<div class="left d-flex align-items-center">
				<Avatar src="@app/assets/images/icons/dashboard_hero.svg" :size="36" />
				<span class="name">Timmy Neutron</span>
				<div class="dot" />
				<span class="subject">Physics</span>
			</div>
			<div class="left d-flex align-items-center">
				<div class="coin d-flex align-items-center">
					<span class="pr-1">+20</span> <Coins :size="28" style="z-index: 1;" />
				</div>
				<button class="answer-btn ml-1 mr-2">
					Add Your Anwser
				</button>
			</div>
		</div>

		<div class="question-body ml-1 mr-2 mt-1">
			<span>From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s. Calculate the total time the ball is in the air?</span>
		</div>

		<div class="question-bottom ml-1  my-2 d-flex align-items-center justify-content-between">
			<div class="left d-flex align-items-center">
				<span class="name mr-2">Posted 30 mins ago</span>
				<div class="tag ml-0-5">
					motion
				</div>
				<div class="tag ml-0-5">
					projectile-motion
				</div>
			</div>
			<div class="left d-flex align-items-center">
				<div class="ml-1 mr-2">
					<span class="icons">
						<i class="fas fa-flag" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'QuestionForm'
})
</script>
<style lang="scss" scoped>
	.headerStyle {
		font-weight: bold;
		text-transform: none;
		color: $color-text-main;
	}

	.questionStyle {
		font-size: 17px;
		color: $color-text-main;
	}

	.icons {
		width: 24px;
		margin-right: 8px;
	}

	.tag {
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		border-radius: 50px;
		color: $color-text-main;
		padding: 1px 14px;
	}

	.question-body {
		span {
			max-width: 800px;
			margin: 32px 0;
			font-size: 20px;
		}
	}

	.question-head {
		.left {
			padding-top: 1rem;

			.dot {
				width: 6px;
				height: 6px;
				background-color: $color-text-sub;
				margin: 0 20px 0 11px;
				border-radius: 50px;
			}

			.name {
				margin-left: 1rem;
				color: $color-text-main;
				font-size: 18px;
				font-weight: 600;
			}

			.subject {
				color: $color-text-sub;
				font-weight: 600;
			}
		}
	}

	.background {
		background: url('@app/assets/images/icons/dashboard_hero.svg') no-repeat right bottom;

		@media (min-width: 600px) {
			background-position: right center;
		}
	}

	h1 {
		color: $color-text-main;
	}

	.bl {
		border-bottom: 1px solid $color-line;
	}

	.ml-1 {
		margin-left: 1.4rem;
	}

	.ml-0-5 {
		margin-left: 12px;
	}

	.pr-1 {
		padding-right: 8px;
	}

	.mr-2 {
		margin-right: 16px;
	}

	.wrapper {
		border-bottom: 1px solid $color-line;
	}
</style>
