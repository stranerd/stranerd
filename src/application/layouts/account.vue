<template>
	<section class="layout-body">
		<section class="layout-side-left">
			<AccountSidebar />
		</section>
		<main class="layout-main">
			<TopNavigation :open-menu="setMenuModalAccountSidebar" />
			<Nuxt class="layout-content" />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/TopNavigation.vue'
import AccountSidebar from '@app/components/layouts/sidebars/AccountSidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AccountLayout',
	components: {
		TopNavigation,
		AccountSidebar
	},
	middleware: ['isAuthenticated'],
	setup () {
		const { setMenuModalAccountSidebar } = useMenuModal()
		return { setMenuModalAccountSidebar }
	}
})
</script>
