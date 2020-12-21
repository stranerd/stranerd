<template>
	<div class="full">
		<div class="sidebar">
			<div class="py-1 px-2">
				<a @click.prevent="close">
					<img src="@/assets/images/icons/close.svg" alt="" width="18" height="18">
				</a>
			</div>
			<hr class="thin">
			<div class="px-1">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'SideMenu',
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
	height: 100vh;
	z-index: 1;
	background: $color-black-transparent;
	overflow-y: auto;
	.sidebar {
		width: clamp(200px, 80%, 300px);
		min-height: 100vh;
		background: $color-white;
		animation: slide-right .5s;
	}
}
@keyframes slide-right {
	from { left: -100px; }
	to { left: 0; }
}
</style>
