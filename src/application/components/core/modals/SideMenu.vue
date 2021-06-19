<template>
	<div class="full">
		<div class="under" @click="close" />
		<div class="sidebar">
			<NuxtLink class="d-lg-none mx-auto logo" to="/">
				<Logo />
			</NuxtLink>
			<div class="px-0-5 d-flex flex-column flex-grow-1">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { modal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'SideMenu',
	props: {
		modal: {
			type: String,
			required: true
		}
	},
	setup (props) {
		return { close: () => modal.close(props.modal) }
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
		color: $color-light-blue;
		background: $color-blue;
		position: absolute;
		top: 0;
		left: 0;
		animation: slide-right .25s;
	}
}
@keyframes slide-right {
	from { left: -100px; }
	to { left: 0; }
}
</style>
