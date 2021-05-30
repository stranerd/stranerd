<template>
	<aside class="sidebar-body gap-1">
		<NuxtLink class="d-none d-lg-block text-center" to="/">
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
			<NuxtLink v-if="isAdmin" class="sidebar-link" to="/admin/">
				<img src="@app/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
		</div>
		<div class="sidebar-links mt-auto">
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
export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const router = useRouter()
		const { isLoggedIn, isTutor, isAdmin } = useAuth()
		const becomeNerd = () => {
			router.push('/nerds/signup')
		}
		const buy = () => {
			router.push('/account/e-wallet')
			useAccountModal().setAccountModalBuyCoins()
		}
		return { isLoggedIn, isTutor, isAdmin, becomeNerd, buy }
	}
})
</script>
