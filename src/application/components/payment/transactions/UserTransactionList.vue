<template>
	<div>
		<h2 class="fw-bold">
			Transaction history
		</h2>
		<table class="table">
			<thead class="bg-light-blue">
				<tr class="py-2">
					<th scope="col">
						Date
					</th>
					<th scope="col">
						Amount
					</th>
					<th scope="col">
						Description
					</th>
				</tr>
			</thead>
			<tbody>
				<UserTransactionListCard v-for="transaction in transactions" :key="transaction.hash" :transaction="transaction" />
			</tbody>
		</table>
		<div v-if="hasMore" class="text-center text-18">
			<div class="thick my-0" />
			<a class="fw-bold text-grey" @click.prevent="fetchOlderTransactions">LOAD MORE</a>
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
