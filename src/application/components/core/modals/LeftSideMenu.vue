<template>
	<SideMenu :close="close" background-class="menu-background" menu-class="menu-left">
		<div class="head gap-1">
			<Logo :secondary="true" />
			<span @click="close">
				<img class="head-icons" src="@app/assets/images/icons/close.svg" alt="">
			</span>
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
		padding: 0.75rem 1rem;
		border-bottom: 5px solid $color-primary;
		@media (min-width: $md) { padding: 0.75rem 2rem; }
		@media (min-width: $lg) { padding: 0.75rem 3rem; }
		@media (min-width: $xl) { padding: 0.75rem 4.5rem; }
	}
</style>
