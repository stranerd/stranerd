<template>
	<SideMenu :close="close" background-class="menu-background" menu-class="menu-left">
		<div class="head gap-1">
			<Logo :secondary="true" />
			<span class="link" @click="close">
				<img src="@app/assets/images/icons/close.svg" alt="">
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
	/deep/ .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		border-bottom: 5px solid $color-primary;
		margin-bottom: 1rem;

		.link {
			& > img {
				width: 24px !important;
				height: 24px !important;
			}
		}
	}
</style>
