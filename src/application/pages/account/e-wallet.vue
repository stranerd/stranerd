<template>
	<div class="d-flex flex-column gap-3">
		<UserCreditBalanceCard :user="user" />
		<UserTransactionList :user-id="id" />
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import UserTransactionList from '@app/components/payment/transactions/UserTransactionList.vue'
import UserCreditBalanceCard from '@app/components/users/account/UserCreditBalanceCard.vue'

export default defineComponent({
	name: 'AccountEWalletPage',
	components: { UserTransactionList, UserCreditBalanceCard },
	layout: 'dashboard',
	middleware: 'isAuthenticated',
	setup () {
		const { id, user } = useAuth()
		useMeta(() => ({
			title: 'Wallet: Check your balances | Stranerd'
		}))
		return { id, user }
	},
	head: {}
})
</script>
