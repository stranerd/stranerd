<template>
	<SideMenu :close="closeMenuModal">
		<AdminSidebar />
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AdminSidebar from '@app/components/layouts/sidebars/AdminSidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminSidebarMenu',
	components: { AdminSidebar },
	setup () {
		const { closeMenuModal } = useMenuModal()
		return { closeMenuModal }
	}
})
</script>
