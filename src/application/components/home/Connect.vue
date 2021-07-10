<template>
	<div>
		<div class="connect gap-1 gap-md-2">
			<img src="@app/assets/images/homepage/globe.svg">
			<span class="fw-bold">
				Join a community of smart students just like you
			</span>
			<NuxtLink class="btn btn-lg white-btn-custom px-3" to="/auth/signup">
				Sign Up Today
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Connect'
})
</script>

<style scoped lang="scss">
	.connect {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		@media (min-width: $lg) { width: 83%; }
	}

	img { width: 80%; }

	.white-btn-custom {
		background-color: $color-white;
		color: $color-primary-dark;
		border: 2px solid $color-white;
		border-radius: 6px;
		font-weight: bold;
		font-size: 15px;
	}
</style>
