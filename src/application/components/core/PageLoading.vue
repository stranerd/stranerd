<template>
	<div class="position-relative">
		<div class="center">
			<div class="spinner-border text-info" role="status" :style="`width:${size}rem;height:${size}rem;`">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'PageLoading',
	props: {
		size: {
			type: Number,
			default: () => 3.5
		}
	}
})
</script>

<style lang="scss" scoped>
	.center{
		background: $blackTransparent;
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10000000000000000;
	}
</style>
