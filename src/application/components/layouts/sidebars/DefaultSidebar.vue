<template>
	<aside class="sidebar-body gap-1">
		<NuxtLink class="d-none d-lg-block text-center logo" to="/">
			<Logo />
		</NuxtLink>
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@app/assets/images/icons/dashboard.svg" alt="">
				<span>Home</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/questions">
				<img src="@app/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/account">
				<img src="@app/assets/images/icons/dashboard-icon.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<MessageLink :key="isLoggedIn" class="sidebar-link" />
			<NuxtLink class="sidebar-link" to="/account#achievements">
				<img src="@app/assets/images/icons/profile-rank.svg" alt="">
				<span>Achievements</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/account/e-wallet">
				<img src="@app/assets/images/icons/e-wallet.svg" alt="">
				<span>e-Wallet</span>
			</NuxtLink>
			<NuxtLink v-if="isAdmin" class="sidebar-link" to="/admin/">
				<img src="@app/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
			<a v-if="isLoggedIn" class="sidebar-link" @click="signout">
				<PageLoading v-if="loading" />
				<img src="@app/assets/images/icons/signout.svg" alt="">
				<span>Signout</span>
			</a>
		</div>
		<div class="sidebar-links">
			<button v-if="isLoggedIn && !isTutor" class="sidebar-btn btn btn-blue-grey" @click="becomeNerd">
				<span>Become A Nerd</span>
			</button>
			<button v-if="isLoggedIn" class="sidebar-btn btn btn-blue-grey" @click="buy">
				<span>Buy Coins</span>
				<Coins class="ms-0-25" :size="24" />
				<Coins class="mx-n0-5" :gold="true" :size="24" />
			</button>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useAccountModal } from '@app/hooks/core/modals'
import { useSessionSignout } from '@app/hooks/auth/session'
import MessageLink from '@app/components/layouts/sidebars/MessageLink.vue'
export default defineComponent({
	name: 'DefaultSidebar',
	components: { MessageLink },
	setup () {
		const router = useRouter()
		const { isLoggedIn, user, isTutor, isAdmin } = useAuth()
		const { loading, signout } = useSessionSignout()
		const becomeNerd = () => {
			router.push('/nerds/signup')
		}
		const buy = () => {
			useAccountModal().openBuyCoins()
		}
		return { isLoggedIn, user, isTutor, isAdmin, becomeNerd, buy, loading, signout }
	}
})
</script>
