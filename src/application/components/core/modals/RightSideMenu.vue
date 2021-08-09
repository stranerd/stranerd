<template>
	<SideMenu :close="close" background-class="sd-menu-background" menu-class="sd-menu-right">
		<div class="head gap-1 text-primary">
			<img class="head-icons" src="@app/assets/images/icons/close.svg" alt="" @click="close">
			<NuxtLink v-if="isAdmin" to="/admin/">
				<img class="head-icons" src="@app/assets/images/icons/admin.svg" alt="">
			</NuxtLink>
			<img v-if="isLoggedIn" class="head-icons" src="@app/assets/images/icons/signout.svg" alt="" @click="signout">
			<PageLoading v-if="loading" />
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
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'RightSideMenu',
	components: { SideMenu },
	props: {
		modal: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { isLoggedIn, isAdmin } = useAuth()
		const { loading, error, signout } = useSessionSignout()
		return { isLoggedIn, isAdmin, loading, error, signout, close: () => modal.close(props.modal) }
	}
})
</script>

<style lang="scss" scoped>
	.head, /deep/ .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: $color-primary-dark;
		color: $color-white;
		padding: 0.75rem 1rem;
	}

	.head-icons, /deep/ .head-icons {
		filter: brightness(1000%);
	}
</style>
