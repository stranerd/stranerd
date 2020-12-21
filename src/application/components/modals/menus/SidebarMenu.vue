<template>
	<SideMenu :close="closeMenuModal">
		<Sidebar />
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'SidebarMenu',
	components: { Sidebar },
	setup () {
		const { closeMenuModal } = useMenuModal()
		return { closeMenuModal }
	}
})
</script>
