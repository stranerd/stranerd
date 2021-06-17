<template>
	<div>
		<SidebarMenu v-if="isMenuModalSidebar" />
		<AdminSidebarMenu v-if="isMenuModalAdminSidebar" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import SidebarMenu from '@app/components/modals/menus/SidebarMenu.vue'
import AdminSidebarMenu from '@app/components/modals/menus/AdminSidebarMenu.vue'
export default defineComponent({
	name: 'MenuModalIndex',
	components: {
		SidebarMenu,
		AdminSidebarMenu
	},
	setup () {
		const { isMenuModalSidebar, isMenuModalAdminSidebar } = useMenuModal()
		return { isMenuModalSidebar, isMenuModalAdminSidebar }
	}
})
</script>
