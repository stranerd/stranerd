<template>
	<aside class="d-flex flex-column gap-1">
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@app/assets/images/icons/dashboard.svg" alt="">
				<span>Questions</span>
			</NuxtLink>

			<NuxtLink class="sidebar-link" to="/nerds">
				<img src="@app/assets/images/icons/nerd.svg" alt="">
				<span>Top Nerds</span>
			</NuxtLink>

			<NuxtLink class="sidebar-link" to="/account/e-wallet">
				<img src="@app/assets/images/icons/e-wallet.svg" alt="">
				<span>E-Wallet</span>
			</NuxtLink>
		</div>
		<div class="sidebar-links px-1-5 gap-1">
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
export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const { user, isAdmin, isLoggedIn } = useAuth()
		const buy = () => useAccountModal().openBuyCoins()
		return { isLoggedIn, user, isAdmin, buy }
	}
})
</script>
