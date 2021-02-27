<template>
	<section class="body">
		<section class="side-left">
			<DashboardSidebar />
		</section>
		<main class="main-view">
			<DashboardTopNavigation />
			<Nuxt class="mx-half mx-lg-0" />
		</main>
		<section class="side-right">
			<DashboardRightPanel />
		</section>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModalBase from '@app/components/modals/Base.vue'
import DashboardSidebar from '@app/components/layouts/sidebars/DashboardSidebar.vue'
import DashboardRightPanel from '@app/components/dashboard/DashboardRightPanel.vue'
import DashboardTopNavigation from '@app/components/layouts/topNavigations/DashboardTopNavigation.vue'
export default defineComponent({
	name: 'DashboardLayout',
	components: { ModalBase, DashboardSidebar, DashboardTopNavigation, DashboardRightPanel }
})
</script>

<style lang="scss" scoped>
.body {
	min-height: 100vh;
	margin: 0 auto;
	max-width: 2000px;
	display: flex;
	flex-direction: column;
	@media (min-width: $lg) {
		flex-direction: row;
	}
}
.side-left {
	display: none;
	background-color: $color-blue;
	padding: 0.5rem;
	@media (min-width: $lg) {
		width: 25%;
		max-width: 400px;
		display: block;
	}
	@media (min-width: 1050px) {
		padding: 1rem;
	}
}
.side-right {
	width: 100%;
	padding: 0.5rem;
	@media (min-width: $lg) {
		background-color: $color-white;
		width: 25%;
		max-width: 400px;
		font-size: 0.9rem;
		margin: 0 0 0 auto;
	}
}
.main-view {
	@media (min-width: $lg) {
		padding: 1rem;
		width: 55%;
		flex-grow: 1;
	}
}
</style>
