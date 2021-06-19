<template>
	<section class="layout-body">
		<section class="layout-side-left">
			<AdminSidebar />
		</section>
		<main class="layout-main">
			<TopNavigation :open-menu="openAdminSidebar" />
			<Nuxt class="layout-content" />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/TopNavigation.vue'
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
