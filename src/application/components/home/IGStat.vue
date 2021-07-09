<template>
	<div class="ig-stat main-background gap-2">
		<div class="gap-0-5 d-flex flex-column">
			<span class="sub">Already trusted by</span>
			<span class="title fw-bold">
				30,000+
			</span>
			<span class="sub-2">Students on social media</span>
		</div>
		<span>
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
		padding: 4rem 1rem 0 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;

		& > * { max-width: 75%; }
		@media (min-width: $md) {
			& > * { max-width: 50%; }
		}
		@media (min-width: $lg) {
			flex-direction: row-reverse;

			& > * {
				flex-grow: 1;
				max-width: 30%;
				text-align: left;
			}
		}

		.sub {
			font-size: 20px;
			@media (min-width: $lg) { font-size: 25px; }
		}

		.sub-2 {
			font-size: 20px;
			@media (min-width: $lg) { font-size: 30px; }
		}

		.title {
			font-size: 50px;
			line-height: 58px;
			@media (min-width: $lg) { font-size: 58px; }
		}

		img {
			width: 100%;
			// width: clamp(75%, 75%, 600px);
			// @media (min-width: $lg) { max-width; }
		}
	}

	.main-background {
		background: $main-background-color;
		color: $color-white;
	}

	.btn-custom {
		background-color: $main-background-color;
		color: #fff;
		border: 2px solid $main-background-color;
		border-radius: 6px;
		font-weight: bold;
	}
</style>
