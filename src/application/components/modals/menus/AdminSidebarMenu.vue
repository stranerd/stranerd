<template>
	<LeftSideMenu :modal="$attrs.modal">
		<AdminSidebar />
	</LeftSideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AdminSidebar from '@app/components/layouts/sidebars/AdminSidebar.vue'
export default defineComponent({
	name: 'AdminSidebarMenu',
	components: { AdminSidebar }
})
</script>
