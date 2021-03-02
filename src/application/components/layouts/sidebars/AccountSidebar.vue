<template>
	<aside class="sidebar-body">
		<Logo class="d-none d-lg-block my-4" />
		<div v-if="isLoggedIn">
			<AccountHeadCard :user="user" />
		</div>
		<div class="my-2 sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/account/questions">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink v-if="isTutor" class="sidebar-link" to="/account/answers">
				<img src="@/assets/images/icons/answers.svg" alt="">
				<span>Answers</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/account/e-wallet">
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
export default defineComponent({
	name: 'AccountSidebar',
	components: { AccountHeadCard },
	setup () {
		const { isLoggedIn, user, isTutor } = useAuth()
		return { isLoggedIn, user, isTutor }
	}
})
</script>
