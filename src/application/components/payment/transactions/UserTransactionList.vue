<template>
	<div class="d-flex flex-column col-12 py-0" style="align-items: center; justify-content: center;">
		<div class="text-center my-1 col-12">
			<h4 class="headertext">
				Transaction history
			</h4>
		</div>
		<div class="col-12 d-flex flex-row table-custom-style my-1 px-1 py-1">
			<div class="col-4 py-0 px-0">
				<span>Date</span>
			</div>
			<div class="col-4 py-0 px-0">
				<span>Amount</span>
			</div>
			<div class="col-4 py-0 px-0">
				<span>Description</span>
			</div>
		</div>
		<div class="d-flex flex-column col-12 px-0 py-0">
			<UserTransactionListCard v-for="transaction in transactions" :key="transaction.hash" :transaction="transaction" />
		</div>
		<div v-if="hasMore" class="text-center text-18 col-12">
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
		color: $color-text-main;
	}

	.table-custom-style {
		border: 1px solid $color-main;
		border-radius: 7px;
		background: $color-line;
		font-weight: bold;
		font-size: 15px;
		color: $color-text-main;
	}
</style>
