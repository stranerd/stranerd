<template>
	<section class="layout-body">
		<section class="layout-side-left">
			<AdminSidebar />
		</section>
		<main class="layout-main">
			<AdminTopNavigation />
			<Nuxt class="layout-content" />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AdminTopNavigation from '@app/components/layouts/topNavigations/AdminTopNavigation.vue'
import AdminSidebar from '@app/components/layouts/sidebars/AdminSidebar.vue'
export default defineComponent({
	name: 'AdminLayout',
	components: {
		AdminTopNavigation,
		AdminSidebar
	},
	middleware: ['isAdmin']
})
</script>
