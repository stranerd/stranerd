<template>
	<tr class="py-2">
		<td>{{ transaction.date }}</td>
		<td>{{ transaction.time }}</td>
		<td class="d-flex align-items-center" :class="transaction.isGain ? 'text-success' : 'text-danger'">
			<span class="mr-half">{{ transaction.isGain ? '+' : '-' }}{{ formatNumber(transaction.amount) }}</span>
			<Coins :gold="transaction.isGold" :size="24" />
		</td>
		<td>{{ transaction.event }}</td>
	</tr>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { TransactionEntity } from '@modules/payment'
import { useTimeDifference } from '@app/hooks/core/dates'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'UserTransactionListCard',
	props: {
		transaction: {
			required: true,
			type: Object as PropType<TransactionEntity>
		}
	},
	setup (props) {
		const { time, startTimer, stopTimer } = useTimeDifference(props.transaction.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { time, formatNumber }
	}
})
</script>
