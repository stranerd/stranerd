<template>
	<div>
		<SidebarMenu v-if="isMenuModalSidebar" />
		<AccountSidebarMenu v-if="isMenuModalAccountSidebar" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import SidebarMenu from '@app/components/modals/menus/SidebarMenu.vue'
import AccountSidebarMenu from '@app/components/modals/menus/AccountSidebarMenu.vue'
export default defineComponent({
	name: 'MenuModalIndex',
	components: {
		SidebarMenu,
		AccountSidebarMenu
	},
	setup () {
		const { isMenuModalSidebar, isMenuModalAccountSidebar } = useMenuModal()
		return { isMenuModalSidebar, isMenuModalAccountSidebar }
	}
})
</script>
