<template>
	<section class="layout-body mb-0">
		<section class="layout-side-left">
			<Sidebar />
		</section>
		<main class="layout-main flex-grow-0 flex-lg-grow-1">
			<TopNavigation :open-menu="setMenuModalSidebar" />
			<Nuxt class="layout-content" />
		</main>
		<section class="layout-side-right">
			<RightSidebar />
		</section>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/TopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'DashboardLayout',
	components: { Sidebar, TopNavigation, RightSidebar },
	setup () {
		const { setMenuModalSidebar } = useMenuModal()
		return { setMenuModalSidebar }
	}
})
</script>
