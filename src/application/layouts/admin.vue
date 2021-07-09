<template>
	<section>
		<TopNavigation :open-menu="openSidebar" />
		<section class="layout-body">
			<section class="layout-side-left">
				<AdminSidebar />
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
import AdminSidebar from '@app/components/layouts/sidebars/AdminSidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminLayout',
	components: {
		TopNavigation,
		AdminSidebar
	},
	middleware: ['isAdmin'],
	setup () {
		const { openAdminSidebar } = useMenuModal()
		return { openAdminSidebar }
	}
})
</script>

<style lang="scss" scoped>
	.layout-main {
		@media (min-width: $lg) { width: 100% - 16.25%; }
	}
</style>
