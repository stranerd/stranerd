<template>
	<aside class="sidebar-body gap-1">
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@app/assets/images/icons/dashboard.svg" alt="">
				<span>Home</span>
			</NuxtLink>

			<NuxtLink class="sidebar-link" to="/nerds">
				<img src="@app/assets/images/icons/nerd.svg" alt="">
				<span>Nerds</span>
			</NuxtLink>

			<NuxtLink class="sidebar-link" to="/account/e-wallet">
				<img src="@app/assets/images/icons/e-wallet.svg" alt="">
				<span>E-Wallet</span>
			</NuxtLink>

			<NuxtLink v-if="isAdmin" class="sidebar-link" to="/admin/">
				<img src="@app/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
		</div>
		<div class="sidebar-links px-1 mt-2 gap-1">
			<button v-if="isLoggedIn" class="sidebar-btn btn" @click="buy">
				<span>Buy Coins</span>
			</button>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useAccountModal } from '@app/hooks/core/modals'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const { user, isAdmin, isLoggedIn } = useAuth()
		const { loading, signout } = useSessionSignout()
		const buy = () => {
			useAccountModal().openBuyCoins()
		}
		return { isLoggedIn, user, isAdmin, buy, loading, signout }
	}
})
</script>
