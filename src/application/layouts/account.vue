<template>
	<section class="layout-body">
		<section class="layout-side-left">
			<AccountSidebar />
		</section>
		<main class="layout-main">
			<AccountTopNavigation />
			<Nuxt class="layout-content" />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AccountTopNavigation from '@app/components/layouts/topNavigations/AccountTopNavigation.vue'
import AccountSidebar from '@app/components/layouts/sidebars/AccountSidebar.vue'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'AccountLayout',
	components: {
		AccountTopNavigation,
		AccountSidebar,
		ModalBase
	},
	middleware: ['isAuthenticated']
})
</script>
