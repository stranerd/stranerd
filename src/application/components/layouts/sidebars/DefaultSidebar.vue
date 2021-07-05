<template>
	<aside class="sidebar-body gap-1 mt-3">
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<div>
					<img src="@app/assets/images/icons/dashboard.svg" alt="">
					<span class="ml-2">Home</span>
				</div>
			</NuxtLink>

			<NuxtLink class="sidebar-link" to="/nerds">
				<div>
					<img src="@app/assets/images/icons/nerd.svg" alt="">
					<span class="ml-2">Nerds</span>
				</div>
			</NuxtLink>

			<NuxtLink class="sidebar-link" to="/account/e-wallet">
				<div>
					<img src="@app/assets/images/icons/e-wallet.svg" alt="">
					<span class="ml-2">e-Wallet</span>
				</div>
			</NuxtLink>

			<NuxtLink v-if="isAdmin" class="sidebar-link" to="/admin/">
				<div>
					<img src="@app/assets/images/icons/admin.svg" alt="">
					<span class="ml-2">Admin Site</span>
				</div>
			</NuxtLink>
			</nuxtlink>
		</div>
		<div class="sidebar-links">
			<button class="sidebar-btn btn " @click="buy">
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
		const { user, isAdmin } = useAuth()
		const { loading, signout } = useSessionSignout()
		const buy = () => {
			useAccountModal().openBuyCoins()
		}
		return { user, isAdmin, buy, loading, signout }
	}
})
</script>
