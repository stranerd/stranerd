<template>
	<section class="layout-body mb-0">
		<section class="layout-side-left">
			<DashboardSidebar />
		</section>
		<main class="layout-main flex-grow-0 flex-lg-grow-1">
			<TopNavigation :open-menu="setMenuModalSidebar" />
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
import TopNavigation from '@app/components/layouts/topNavigations/TopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'DashboardLayout',
	components: { DashboardSidebar, TopNavigation, DashboardRightPanel },
	setup () {
		const { setMenuModalSidebar } = useMenuModal()
		return { setMenuModalSidebar }
	}
})
</script>
