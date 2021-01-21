<template>
	<div class="page-content">
		<UserTransactionList :user-id="id" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserTransactionList from '@app/components/payment/transactions/UserTransactionList.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AccountEWalletPage',
	components: { UserTransactionList },
	layout: 'account',
	setup () {
		const { id } = useAuth()
		return { id }
	}
})
</script>
