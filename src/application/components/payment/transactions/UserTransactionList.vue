<template>
	<div>
		<h1>Transaction history</h1>
		<table class="table">
			<thead>
				<tr class="py-2">
					<th scope="col">
						Amount
					</th>
					<th scope="col">
						Date
					</th>
					<th scope="col">
						Event
					</th>
				</tr>
			</thead>
			<tbody>
				<UserTransactionListCard v-for="transaction in transactions" :key="transaction.hash" :transaction="transaction" />
			</tbody>
		</table>
		<hr class="thin mt-0">
		<div v-if="hasMore" class="text-center text-18">
			<a class="font-weight-bold text-grey" @click.prevent="fetchOlderTransactions">LOAD MORE</a>
		</div>
		<DisplayWarning v-if="!loading && !error && transactions.length === 0" message="You haven't performed any transactions on this site yet" />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useTransactionList } from '@app/hooks/payment/transactions'
import UserTransactionListCard from '@app/components/payment/transactions/UserTransactionListCard.vue'
export default defineComponent({
	name: 'UserTransactionList',
	components: { UserTransactionListCard },
	props: {
		userId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { loading, error, transactions, hasMore, fetchOlderTransactions } = useTransactionList(props.userId)
		return { loading, error, transactions, hasMore, fetchOlderTransactions }
	}
})
</script>
