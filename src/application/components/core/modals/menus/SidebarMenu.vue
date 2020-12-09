<template>
	<div class="full">
		<div class="sidebar">
			<div class="py-1 px-2">
				<a @click.prevent="closeMenuModal">
					<img src="@/assets/images/icons/close.svg" alt="" width="18" height="18">
				</a>
			</div>
			<hr class="thin">
			<div class="px-1">
				<Sidebar />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '@app/components/layouts/Sidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'SidebarMenu',
	components: {
		Sidebar
	},
	setup () {
		const { closeMenuModal } = useMenuModal()
		return { closeMenuModal }
	}
})
</script>

<style lang="scss" scoped>
.full {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100vw;
	min-height: 100vh;
	background: $color-black-transparent;
	.sidebar {
		width: clamp(200px, 80%, 300px);
		position: relative;
		background: $color-white;
		min-height: 100vh;
		animation: slide-right .5s;
	}
}
@keyframes slide-right {
	from { left: -100px; }
	to { left: 0; }
}
</style>
