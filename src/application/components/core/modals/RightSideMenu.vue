<template>
	<div class="full">
		<div class="under" @click="close" />
		<div class="sidebar">
			<div class="d-flex flex-column flex-grow-1">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'RightSideMenu',
	props: {
		close: {
			type: Function,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
.full {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: vh(100);
	z-index: 1;
	background: rgba($color-blue-grey, .5);
	overflow-y: auto;
	.under {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: vh(100);
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		box-shadow: 3px 0 12px rgba($color-black, 1);
		width: clamp(288px, 75%, 300px);
		min-height: vh(100);
		color: $color-blue-grey;
		background: $color-white;
		position: absolute;
		top: 0;
		right: 0;
		animation: slide-left .25s;
	}
}
@keyframes slide-left {
	from { right: -100px; }
	to { right: 0; }
}
</style>
