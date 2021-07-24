<template>
	<div class="layout-page">
		<TopNavigation />
		<section class="layout-body gap-3">
			<section class="layout-side-left">
				<Sidebar />
			</section>
			<main class="layout-main">
				<Nuxt />
			</main>
			<section class="layout-side-right">
				<RightSidebar />
			</section>
		</section>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
export default defineComponent({
	name: 'DashboardLayout',
	components: { Sidebar, TopNavigation, RightSidebar }
})
</script>
