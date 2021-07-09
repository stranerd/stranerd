<template>
	<section>
		<TopNavigation :open-menu="openSidebar" />
		<section class="layout-body">
			<section class="layout-side-left">
				<Sidebar />
			</section>
			<main class="layout-main">
				<Nuxt class="layout-content" />
			</main>
			<ModalBase />
		</section>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AccountLayout',
	components: {
		TopNavigation,
		Sidebar
	},
	middleware: ['isAuthenticated'],
	setup () {
		const { openSidebar } = useMenuModal()
		return { openSidebar }
	}
})
</script>

<style lang="scss" scoped>
	.layout-main {
		@media (min-width: $lg) { width: 100% - 16.25%; }
	}
</style>
