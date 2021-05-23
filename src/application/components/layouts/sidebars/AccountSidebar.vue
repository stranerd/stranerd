<template>
	<aside class="sidebar-body gap-1">
		<NuxtLink class="d-none d-lg-block text-center" to="/">
			<Logo />
		</NuxtLink>
		<AccountHeadCard v-if="isLoggedIn" :user="user" />
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@app/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/account/">
				<img src="@app/assets/images/icons/users.svg" alt="">
				<span>Profile</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/account/questions">
				<img src="@app/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink v-if="isTutor" class="sidebar-link" to="/account/answers">
				<img src="@app/assets/images/icons/answers.svg" alt="">
				<span>Answers</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/account/e-wallet">
				<img src="@app/assets/images/icons/e-wallet.svg" alt="">
				<span>E-Wallet</span>
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
import AccountHeadCard from '@app/components/users/account/AccountHeadCard.vue'
import { useAccountModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AccountSidebar',
	components: { AccountHeadCard },
	setup () {
		const router = useRouter()
		const { isLoggedIn, user, isTutor } = useAuth()
		const becomeNerd = () => {
			router.push('/nerds/signup')
		}
		const buy = () => {
			router.push('/account/e-wallet')
			useAccountModal().setAccountModalBuyCoins()
		}
		return { isLoggedIn, user, isTutor, buy, becomeNerd }
	}
})
</script>
