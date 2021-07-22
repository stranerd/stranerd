<template>
	<SideMenu :close="close" background-class="menu-background" menu-class="menu-right">
		<div class="head gap-1 text-primary">
			<span class="link" @click="close">
				<img src="@app/assets/images/icons/close.svg" alt="">
			</span>
			<MessageLink :key="'messages' + isLoggedIn" class="link" />
			<NuxtLink v-if="isAdmin" to="/admin/" class="link">
				<img src="@app/assets/images/icons/admin.svg" alt="">
			</NuxtLink>
			<span v-if="isLoggedIn" class="link" @click="signout">
				<img src="@app/assets/images/icons/signout.svg" alt="">
			</span>
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
import MessageLink from '@app/components/layouts/topNavigations/MessageLink.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'RightSideMenu',
	components: { SideMenu, MessageLink },
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
		padding: 1rem 1.5rem;
		border-bottom: 5px solid $color-primary;

		.link {
			& > img {
				width: 24px !important;
				height: 24px !important;
			}
		}
	}
</style>
