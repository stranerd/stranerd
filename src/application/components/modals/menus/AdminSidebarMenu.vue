<template>
	<SideMenu :modal="$attrs.modal">
		<AdminSidebar />
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AdminSidebar from '@app/components/layouts/sidebars/AdminSidebar.vue'
export default defineComponent({
	name: 'AdminSidebarMenu',
	components: { AdminSidebar }
})
</script>
