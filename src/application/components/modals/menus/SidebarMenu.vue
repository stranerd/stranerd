<template>
	<SideMenu :modal="$attrs.modal">
		<Sidebar />
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
export default defineComponent({
	name: 'SidebarMenu',
	components: { Sidebar }
})
</script>
