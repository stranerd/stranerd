<template>
	<section class="body d-flex flex-column flex-lg-row p-lg-0">
		<section class="side-left">
			<DashboardSidebar />
		</section>
		<main class="main-view">
			<DashboardTopNavigation />
			<Nuxt />
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
}
.side-left {
	display: none;
	background-color: $color-blue;
	padding: 0.5rem;
	width: 20%;
	box-shadow: 3px 0 10px rgba($color-black, 0.1);
	@media (min-width: $lg) {
		display: block;
	}
	@media (min-width: 1050px) {
		padding: 1rem;
	}
}
.side-right {
	width: 100%;
	margin: 0.5rem 0;
	padding: 0 0.25rem;
	@media (min-width: $lg) {
		background-color: $color-white;
		padding: 1rem 0.5rem;
		width: 25%;
		max-width: 350px;
		font-size: 0.9rem;
		margin: 0 0 0 auto;
	}
}
.main-view {
	flex-grow: 0;
	padding: 0 0.25rem;
	@media (min-width: $lg) {
		width: 55%;
		padding: 1rem;
		flex-grow: 1;
	}
}
</style>
