<template>
	<div class="layout-page">
		<TopNavigation :open-menu="openSidebar" />
		<section class="layout-body">
			<section class="layout-side-left">
				<Sidebar />
			</section>
			<main class="layout-main">
				<Nuxt />
			</main>
			<section class="layout-side-right">
				<ProfileSidebar />
			</section>
			<ModalBase />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import ProfileSidebar from '@app/components/layouts/sidebars/ProfileSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'DashboardLayout',
	components: { Sidebar, TopNavigation, ProfileSidebar },
	setup () {
		const { openSidebar } = useMenuModal()
		return { openSidebar }
	}
})
</script>
