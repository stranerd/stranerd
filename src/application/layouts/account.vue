<template>
	<section class="layout-body">
		<section class="layout-side-left">
			<Sidebar />
		</section>
		<main class="layout-main">
			<TopNavigation :open-menu="setMenuModalSidebar" />
			<Nuxt class="layout-content" />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/TopNavigation.vue'
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
		const { setMenuModalSidebar } = useMenuModal()
		return { setMenuModalSidebar }
	}
})
</script>
