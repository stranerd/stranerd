<template>
	<section class="layout-body">
		<section class="layout-side-left">
			<DashboardSidebar />
		</section>
		<main class="layout-main">
			<DashboardTopNavigation />
			<Nuxt class="layout-content" />
		</main>
		<section class="layout-side-right">
			<DashboardRightPanel />
		</section>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DashboardSidebar from '@app/components/layouts/sidebars/DashboardSidebar.vue'
import DashboardRightPanel from '@app/components/dashboard/DashboardRightPanel.vue'
import DashboardTopNavigation from '@app/components/layouts/topNavigations/DashboardTopNavigation.vue'
export default defineComponent({
	name: 'DashboardLayout',
	components: { DashboardSidebar, DashboardTopNavigation, DashboardRightPanel }
})
</script>
