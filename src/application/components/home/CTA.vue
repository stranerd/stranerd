<template>
	<div class="cta gap-2">
		<div class="cta-info d-flex flex-column align-items-center align-items-lg-start gap-1">
			<h1 class="headerStyle text-primary-dark mb-0">
				Get quick help for homework and study problems
			</h1>
			<span class="paragraphStyle">
				Leverage a large community of smart student for your academic needs
				while make connections that would impact you for life.
			</span>
			<NuxtLink
				class="btn btn-lg btn-custom px-3"
				style="font-size: 18px; font-weight: bold;"
				to="/auth/signup"
			>
				Join Today
			</NuxtLink>
		</div>
		<div class="text-center">
			<img src="@app/assets/images/homepage/home_image.svg" class="w-100">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'CTA'
})
</script>

<style scoped lang="scss">
	.cta {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column-reverse;
		min-height: vh(100);
		padding: 1rem;
		text-align: center;
		@media (min-width: $md) {
			min-height: vh(60);
		}
		@media (min-width: $lg) {
			text-align: left;
			flex-direction: row;
			min-height: vh(90);
		}

		img {
			max-width: 600px;
		}

		& > * {
			flex-grow: 1;
			max-width: 90%;
			@media (min-width: $md) {
				max-width: 80%;
			}
			@media (min-width: $lg) {
				max-width: 40%;
			}
		}
	}

	.paragraphStyle {
		font-size: 16px;
		@media (min-width: $md) { font-size: 20px; }
		@media (min-width: $lg) { font-size: 24px; }
		@media (min-width: $xl) { font-size: 28px; }
	}

	.headerStyle {
		font-weight: bold;
		text-transform: none;
		font-size: 22px;
		@media (min-width: $md) { font-size: 42px; }
		@media (min-width: $lg) { font-size: 48px; }
		@media (min-width: $xl) { font-size: 56px; }
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		border: 2px solid $color-primary-dark;
		border-radius: 6px;
		font-weight: bold;
	}
</style>
