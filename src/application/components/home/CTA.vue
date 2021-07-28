<template>
	<div class="d-flex flex-column align-items-center justify-content-center gap-2 mb-2 mt-md-4">
		<div class="text-center col-12 mt-3">
			<img src="@app/assets/images/homepage/connect.svg" class="image-custom">
		</div>
		<div class=" d-flex flex-column align-items-center justify-content-center col-lg-6 col-12 px-1 mt-2">
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
			max-width: 90%;
			@media (min-width: $md) {
				max-width: 80%;
			}
			@media (min-width: $lg) {
				max-width: 40%;
				flex-grow: 1;
			}
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

	.image-custom {
		width: 80%;
		@media (min-width: $md) { width: 80%; }
		@media (min-width: $lg) { width: 43%; }
		@media (min-width: $xl) { width: 45%; }
	}

</style>
