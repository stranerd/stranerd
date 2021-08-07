<template>
	<SideMenu :close="close" background-class="sd-menu-background" menu-class="sd-menu-left">
		<div class="head gap-1">
			<Logo />
			<img class="head-icons" src="@app/assets/images/icons/close.svg" alt="" @click="close">
		</div>
		<div class="d-flex flex-column flex-grow-1">
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

<style lang="scss" scoped>
	.head, /deep/ .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		background: $color-primary-dark;
		color: $color-white;
		padding: 0.75rem 1rem;
	}

	.head-icons, /deep/ .head-icons {
		filter: brightness(500%);
	}
</style>
