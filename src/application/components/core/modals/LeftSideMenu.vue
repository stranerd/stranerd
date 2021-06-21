<template>
	<SideMenu :close="close" background-class="menu-background" menu-class="menu-left">
		<NuxtLink class="d-lg-none mx-auto logo" to="/">
			<Logo />
		</NuxtLink>
		<div class="px-0-5 d-flex flex-column flex-grow-1">
			<slot />
		</div>
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { modal } from '@app/hooks/core/modals'
import SideMenu from '@app/components/core/modals/SideMenu.vue'
export default defineComponent({
	name: 'LeftSideMenu',
	components: { SideMenu },
	props: {
		modal: {
			type: String,
			required: true
		}
	},
	setup (props) {
		return { close: () => modal.close(props.modal) }
	}
})
</script>
