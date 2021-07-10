<template>
	<div class="ig-stat main-background gap-2">
		<div class="text gap-0-5 py-md-2 d-flex flex-column">
			<span class="sub">Already trusted by</span>
			<span class="title fw-bold">
				30,000+
			</span>
			<span class="sub-2">Students on social media</span>
		</div>
		<span class="image">
			<img src="@app/assets/images/homepage/phone.png">
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'IGStat'
})
</script>

<style scoped lang="scss">
	.ig-stat {
		padding: 4rem 1rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;

		& > * { max-width: 90%; }
		@media (min-width: $md) {
			flex-direction: row-reverse;
			align-items: flex-start;

			& > * {
				flex-grow: 1;
				text-align: left;
				max-width: 50%;
			}

			.image { max-width: 30%; }
		}

		.sub {
			font-size: 16px;
			@media (min-width: $md) { font-size: 20px; }
			@media (min-width: $lg) { font-size: 36px; }
		}

		.sub-2 {
			font-size: 26px;
			@media (min-width: $lg) { font-size: 31px; }
			@media (min-width: $lg) { font-size: 57px; }
		}

		.title {
			font-size: 55px;
			line-height: 60px;
			@media (min-width: $md) { font-size: 66px; line-height: 72px; }
			@media (min-width: $lg) { font-size: 120px; line-height: 130px; }
		}

		img {
			width: 100%;
		}
	}

	.main-background {
		background: $color-primary-dark;
		color: $color-white;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		border: 2px solid $color-primary-dark;
		border-radius: 6px;
		font-weight: bold;
	}
</style>
