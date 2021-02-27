<template>
	<aside>
		<SidebarLogo class="d-none d-lg-block" />
		<div v-if="isLoggedIn">
			<AccountHeadCard :user="user" />
		</div>
		<div class="my-2 d-flex flex-column">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/e-wallet">
				<img src="@/assets/images/icons/e-wallet.svg" alt="">
				<span>E-Wallet</span>
			</NuxtLink>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import AccountHeadCard from '@app/components/users/account/AccountHeadCard.vue'
import SidebarLogo from '@app/components/layouts/sidebars/SidebarLogo.vue'
export default defineComponent({
	name: 'AccountSidebar',
	components: { AccountHeadCard, SidebarLogo },
	setup () {
		const { isLoggedIn, user } = useAuth()
		return { isLoggedIn, user }
	}
})
</script>

<style lang="scss" scoped>
aside {
	color: $color-light-blue;
}
.link {
	padding: 0.75rem 1rem;
	margin: 0.25rem 0;
	display: flex;
	align-items: center;
	font-weight: 500;
	img {
		height: 24px;
		width: 24px;
	}
	span {
		font-size: 18px;
		margin-left: 0.75rem;
	}
}
.nuxt-link-exact-active {
	font-weight: 600;
	background: $color-light-blue;
	color: $color-blue;
	border-radius: 1rem;
	img { filter: brightness(80%); }
}
</style>
