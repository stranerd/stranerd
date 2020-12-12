<template>
	<nav class="d-flex align-items-center">
		<button class="navbar-toggler rounded-0 mr-1 d-lg-none" type="button" @click="setMenuModalAccountSidebar">
			<span class="fas fa-bars text-grey" />
		</button>
		<img src="@/assets/images/stranerd_logo.png" alt="Stranerd" height="50">
		<div class="links ml-auto d-flex">
			<BaseLink class="link" to="/">
				<img src="@/assets/images/icons/search.svg" alt="">
			</BaseLink>
			<BaseLink class="link d-none d-md-inline" to="/">
				<img src="@/assets/images/icons/chat.svg" alt="">
			</BaseLink>
			<BaseLink class="link d-none d-md-inline" to="/">
				<img src="@/assets/images/icons/users.svg" alt="">
			</BaseLink>
			<BaseLink class="link" to="/">
				<img src="@/assets/images/icons/notification.svg" alt="">
			</BaseLink>
			<BaseLink class="link d-none d-md-inline" to="/">
				<img src="@/assets/images/icons/signout.svg" alt="">
			</BaseLink>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AccountTopNavigation',
	setup () {
		const { setMenuModalAccountSidebar } = useMenuModal()
		return { setMenuModalAccountSidebar }
	}
})
</script>

<style lang="scss" scoped>
nav {
	background: $color-white;
	padding: 0.5rem 0.75rem;
	.links {
		.link {
			color: $color-grey;
			margin: 0 1rem;
			img {
				width: 24px;
				height: 24px;
			}
			@media (min-width: $md) {
				img {
					width: 28px;
					height: 28px;
				}
			}
			@media (min-width: $lg) {
				width: 36px;
				height: 36px;
				background: $color-white;
				border-radius: 10rem;
				margin: 0 0.5rem;
				img {
					margin: 8px;
					width: 20px;
					height: 20px;
				}
			}
		}
	}
}
</style>
