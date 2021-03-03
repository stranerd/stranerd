<template>
	<div>
		<div class="page-content mb-2">
			<UserCreditBalanceCard :user="user" />
		</div>
		<div class="page-content my-2">
			<UserTransactionList :user-id="id" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import UserTransactionList from '@app/components/payment/transactions/UserTransactionList.vue'
import UserCreditBalanceCard from '@app/components/users/account/UserCreditBalanceCard.vue'
export default defineComponent({
	name: 'AccountEWalletPage',
	components: { UserTransactionList, UserCreditBalanceCard },
	layout: 'account',
	setup () {
		const { id, user } = useAuth()
		return { id, user }
	}
})
</script>
