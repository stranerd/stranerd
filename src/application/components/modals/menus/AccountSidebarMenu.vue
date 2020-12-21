<template>
	<SideMenu :close="closeMenuModal">
		<AccountSidebar />
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AccountSidebar from '@app/components/layouts/sidebars/AccountSidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AccountSidebarMenu',
	components: { AccountSidebar },
	setup () {
		const { closeMenuModal } = useMenuModal()
		return { closeMenuModal }
	}
})
</script>
