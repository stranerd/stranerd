<template>
	<div>
		<SidebarMenu v-if="isMenuModalSidebar" />
		<AccountSidebarMenu v-if="isMenuModalAccountSidebar" />
		<AdminSidebarMenu v-if="isMenuModalAdminSidebar" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import SidebarMenu from '@app/components/modals/menus/SidebarMenu.vue'
import AccountSidebarMenu from '@app/components/modals/menus/AccountSidebarMenu.vue'
import AdminSidebarMenu from '@app/components/modals/menus/AdminSidebarMenu.vue'
export default defineComponent({
	name: 'MenuModalIndex',
	components: {
		SidebarMenu,
		AccountSidebarMenu,
		AdminSidebarMenu
	},
	setup () {
		const { isMenuModalSidebar, isMenuModalAccountSidebar, isMenuModalAdminSidebar } = useMenuModal()
		return { isMenuModalSidebar, isMenuModalAccountSidebar, isMenuModalAdminSidebar }
	}
})
</script>
