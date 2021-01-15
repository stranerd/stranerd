<template>
	<SideMenu :close="closeMenuModal">
		<UserSidebar />
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserSidebar from '@app/components/layouts/sidebars/UserSidebar.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'UserSidebarMenu',
	components: { UserSidebar },
	setup () {
		const { closeMenuModal } = useMenuModal()
		return { closeMenuModal }
	}
})
</script>
