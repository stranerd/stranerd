<template>
	<div class="d-flex flex-column align-items-center justify-content-center gap-2">
		<h4 class="headertext">
			Transaction history
		</h4>
		<div class="d-flex flex-column gap-0-5 w-100">
			<div class="d-flex table-custom-style p-1 mb-0-25">
				<div class="col-3">
					<span>Date</span>
				</div>
				<div class="col-3 text-center">
					<span>Amount</span>
				</div>
				<div class="col-6">
					<span>Description</span>
				</div>
			</div>
			<UserTransactionListCard v-for="transaction in transactions" :key="transaction.hash" :transaction="transaction" />
		</div>
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
<style lang="scss" scoped>

	.headertext {
		font-weight: bold;
		color: $color-dark;
		margin: 0;
	}

	.table-custom-style {
		border: 1px solid $color-main;
		border-radius: 7px;
		background: $color-line;
		font-weight: bold;
		font-size: 15px;
		color: $color-dark;
	}
</style>
