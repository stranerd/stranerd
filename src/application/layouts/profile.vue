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
				<ProfileRightSidebar />
			</section>
			<ModalBase />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import ProfileRightSidebar from '@app/components/layouts/sidebars/ProfileRightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'ProfileLayout',
	components: { Sidebar, TopNavigation, ProfileRightSidebar },
	setup () {
		const { openSidebar } = useMenuModal()
		return { openSidebar }
	}
})
</script>
