<template>
	<div>
		<TopNavigation :open-menu="openSidebar" />
		<section class="d-flex flex-row mb-0 col-12 px-0 py-0">
			<section class="col-md-3  px-1 py-0">
				<Sidebar />
			</section>
			<main class="layout-main flex-grow-0 col-md-6 px-0 py-0">
				<Nuxt class="ranking-layout-content" />
			</main>
			<section class="layout-side-right col-md-3 px-1 py-0">
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
