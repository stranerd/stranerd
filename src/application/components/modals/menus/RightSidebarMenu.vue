<template>
	<RightSideMenu :close="closeMenuModal">
		<RightSidebar />
	</RightSideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'
export default defineComponent({
	name: 'RightSidebarMenu',
	components: { RightSidebar },
	setup () {
		const { closeMenuModal } = useMenuModal()
		return { closeMenuModal }
	}
})
</script>
