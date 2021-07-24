<template>
	<section class="layout-page">
		<TopNavigation />
		<section class="layout-body gap-3">
			<section class="layout-side-left">
				<Sidebar />
			</section>
			<main class="layout-main">
				<Nuxt />
			</main>
		</section>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
export default defineComponent({
	name: 'AccountLayout',
	components: {
		TopNavigation,
		Sidebar
	},
	middleware: ['isAuthenticated']
})
</script>
