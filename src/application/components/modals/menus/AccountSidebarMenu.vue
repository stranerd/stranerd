<template>
	<SideMenu :modal="$attrs.modal">
		<AccountSidebar />
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AccountSidebar from '@app/components/layouts/sidebars/AccountSidebar.vue'
export default defineComponent({
	name: 'AccountSidebarMenu',
	components: { AccountSidebar }
})
</script>
