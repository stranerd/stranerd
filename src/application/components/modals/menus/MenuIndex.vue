<template>
	<div>
		<SidebarMenu v-if="isMenuModalSidebar" />
		<RightSidebarMenu v-if="isMenuModalRightSidebar" />
		<AdminSidebarMenu v-if="isMenuModalAdminSidebar" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import SidebarMenu from '@app/components/modals/menus/SidebarMenu.vue'
import RightSidebarMenu from '@app/components/modals/menus/RightSidebarMenu.vue'
import AdminSidebarMenu from '@app/components/modals/menus/AdminSidebarMenu.vue'
export default defineComponent({
	name: 'MenuModalIndex',
	components: {
		SidebarMenu,
		RightSidebarMenu,
		AdminSidebarMenu
	},
	setup () {
		const { isMenuModalSidebar, isMenuModalRightSidebar, isMenuModalAdminSidebar } = useMenuModal()
		return { isMenuModalSidebar, isMenuModalRightSidebar, isMenuModalAdminSidebar }
	}
})
</script>
