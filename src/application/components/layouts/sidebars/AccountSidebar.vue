<template>
	<aside class="sidebar-body">
		<NuxtLink class="d-none d-lg-block text-center my-4" to="/">
			<Logo />
		</NuxtLink>
		<div v-if="isLoggedIn">
			<AccountHeadCard :user="user" />
		</div>
		<div class="my-2 sidebar-links">
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
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import AccountHeadCard from '@app/components/users/account/AccountHeadCard.vue'
export default defineComponent({
	name: 'AccountSidebar',
	components: { AccountHeadCard },
	setup () {
		const { isLoggedIn, user, isTutor } = useAuth()
		return { isLoggedIn, user, isTutor }
	}
})
</script>
