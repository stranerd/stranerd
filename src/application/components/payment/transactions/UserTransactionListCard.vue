<template>
	<tr class="py-2">
		<td>{{ formatTime(transaction.createdAt) }}</td>
		<td class="d-flex align-items-center justify-content-end" :class="transaction.isGain ? 'text-success' : 'text-danger'">
			<span class="mr-half">{{ transaction.isGain ? '+' : '-' }}{{ formatNumber(transaction.amount) }}</span>
			<Coins :gold="transaction.isGold" :size="24" />
		</td>
		<td>{{ transaction.event }}</td>
	</tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { TransactionEntity } from '@modules/payment'
import { formatNumber } from '@utils/numbers'
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
