<template>
	<div class="features gap-2 gap-md-2-5 gap-lg-4">
		<h1>Features</h1>
		<div class="d-flex flex-column flex-lg-row gap-1-25 gap-md-2-5 gap-lg-3-5">
			<div class="feature gap-1">
				<img src="@app/assets/images/homepage/corner.svg" class="corner">
				<div class="feature-content gap-1">
					<img src="@app/assets/images/homepage/question.svg">
					<h4>Chat Sessions</h4>
					<span>
						Spend quality of time on Chat with Nerd who help you study,
						solve problems, and explain solutions thoroughly.
					</span>
				</div>
			</div>
			<div class="feature gap-1">
				<img src="@app/assets/images/homepage/corner.svg" class="corner">
				<div class="feature-content gap-1">
					<img src="@app/assets/images/homepage/mark2.svg">
					<h4>Best Answers</h4>
					<span>
						Your question get multiple answers and you are able to
						choose which is best for you.
					</span>
				</div>
			</div>
			<div class="feature gap-1">
				<img src="@app/assets/images/homepage/corner.svg" class="corner">
				<div class="feature-content gap-1">
					<img src="@app/assets/images/homepage/user1.svg">
					<h4>Become A Nerd</h4>
					<span>
						Answer Questions and Host Chat Sessions to help other
						students in the subject you are Very Good in.
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Features'
})
</script>

<style scoped lang="scss">
	.features {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		@media (min-width: $lg) { width: 83%; }

		.feature {
			@media (min-width: $md) { width: 65%; }
			@media (min-width: $lg) { width: calc(0.3333 * (100% - 7rem)); }

			position: relative;
			padding: 4rem 0;
			margin: 0 auto;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
			transition: 0.3s;
			border-radius: 0 26px 26px 26px;
			&:hover { box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); }

			.corner {
				position: absolute;
				top: 0;
				left: -1px;
				height: 5rem;
			}

			.feature-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-items: center;
				padding: 0 1rem;
				text-align: center;

				span {
					color: $color-sub;
					font-size: 15px;
					@media (min-width: $md) { font-size: 17px; }
					@media (min-width: $lg) { font-size: 21px; }
				}

				h4 {
					color: $color-dark;
					font-weight: 700;
					font-size: 21px;
					@media (min-width: $md) { font-size: 26px; }
					@media (min-width: $md) { font-size: 30px; }
				}
			}
		}
	}

	h1 {
		text-align: center;
		margin-bottom: 0;
		font-size: 24px;
		@media (min-width: $md) { font-size: 42px; }
		@media (min-width: $lg) { font-size: 52px; }
	}
</style>
