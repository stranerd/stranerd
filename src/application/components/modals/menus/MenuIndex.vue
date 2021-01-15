<template>
	<div>
		<SidebarMenu v-if="isMenuModalSidebar" />
		<AccountSidebarMenu v-if="isMenuModalAccountSidebar" />
		<UserSidebarMenu v-if="isMenuModalUserSidebar" />
		<AdminSidebarMenu v-if="isMenuModalAdminSidebar" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import SidebarMenu from '@app/components/modals/menus/SidebarMenu.vue'
import AccountSidebarMenu from '@app/components/modals/menus/AccountSidebarMenu.vue'
import UserSidebarMenu from '@app/components/modals/menus/UserSidebarMenu.vue'
import AdminSidebarMenu from '@app/components/modals/menus/AdminSidebarMenu.vue'
export default defineComponent({
	name: 'MenuModalIndex',
	components: {
		SidebarMenu,
		AccountSidebarMenu,
		UserSidebarMenu,
		AdminSidebarMenu
	},
	setup () {
		const { isMenuModalSidebar, isMenuModalAccountSidebar, isMenuModalUserSidebar, isMenuModalAdminSidebar } = useMenuModal()
		return { isMenuModalSidebar, isMenuModalAccountSidebar, isMenuModalUserSidebar, isMenuModalAdminSidebar }
	}
})
</script>
