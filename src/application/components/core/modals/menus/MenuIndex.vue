<template>
	<div>
		<SidebarMenu v-if="isMenuModalSidebar" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import SidebarMenu from '@app/components/core/modals/menus/SidebarMenu.vue'
export default defineComponent({
	name: 'MenuModalIndex',
	components: {
		SidebarMenu
	},
	setup () {
		const { isMenuModalSidebar } = useMenuModal()
		return { isMenuModalSidebar }
	}
})
</script>
