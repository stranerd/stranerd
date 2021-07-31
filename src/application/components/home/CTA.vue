<template>
	<div class="cta gap-2 pt-3 pb-5">
		<div class="text-center">
			<img src="@app/assets/images/homepage/connect.svg" width="100%" class="d-md-none">
			<img src="@app/assets/images/homepage/connect.svg" width="90%" class="d-none d-md-inline-block d-lg-none">
			<img src="@app/assets/images/homepage/connect.svg" width="80%" class="d-none d-lg-inline-block">
		</div>
		<div class="d-flex flex-column align-items-center justify-content-center col-lg-6 mt-2">
			<div class="text-center mb-2">
				<h1 class="headerStyle text-primary-dark mb-1">
					Get quick help for homework and study problems
				</h1>
				<span class="paragraphStyle">
					Leverage a large community of smart student for your academic needs
					while make connections that would impact you for life.
				</span>
			</div>
			<NuxtLink
				class="btn btn-lg btn-custom px-3 py-1"
				style="font-size: 18px; font-weight: bold;"
				to="/auth/signup"
			>
				Join Today
			</NuxtLink>
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
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// min-height: vh(100);
		padding: 1rem;
		text-align: center;
		@media (min-width: $md) {
			min-height: vh(80);
		}
		@media (min-width: $lg) {
			min-height: vh(60);
		}
	}

	.paragraphStyle {
		font-size: 15px;
		color: $color-sub;
		@media (min-width: $md) { font-size: 18px; }
		@media (min-width: $lg) { font-size: 20px; }
		@media (min-width: $xl) { font-size: 24px; }
	}

	.headerStyle {
		font-weight: bold;
		text-transform: none;
		font-size: 24px;
		color: $color-primary-dark;
		@media (min-width: $md) { font-size: 34px; }
		@media (min-width: $lg) { font-size: 40px; }
		@media (min-width: $xl) { font-size: 48px; }
	}

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		border: 2px solid $color-primary;
		border-radius: 6px;
		font-weight: bold;
	}
</style>
