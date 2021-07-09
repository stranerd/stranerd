<template>
	<div class="col-12 d-flex flex-row table-data-style my-1 px-1 py-1">
		<div class="col-4 py-0 px-0">
			<span>{{ formatTime(transaction.createdAt) }}</span>
		</div>
		<div class="col-4 py-0 px-0">
			<span>{{ transaction.isGain ? '+' : '-' }}{{ formatNumber(transaction.amount) }}</span>
		</div>
		<div class="col-4 py-0 px-0">
			<span>{{ transaction.event }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { TransactionEntity } from '@modules/meta'
import { formatNumber } from '@utils/commons'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'UserTransactionListCard',
	props: {
		transaction: {
			required: true,
			type: Object as PropType<TransactionEntity>
		}
	},
	setup () {
		return { formatNumber, formatTime }
	}
})
</script>
<style lang="scss" scoped>
.table-data-style {
	border:1px solid $color-line;
	border-radius:7px;
	background: $color-tags;
	font-size: 15px;
	color: $color-text-main;
}
</style>
