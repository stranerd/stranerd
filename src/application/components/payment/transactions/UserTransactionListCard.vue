<template>
	<tr class="py-2">
		<td :class="transaction.amount > 0 ? 'text-success' : 'text-danger'">
			{{ transaction.amount > 0 ? '+' : '-' }}${{ Math.abs(transaction.amount).toFixed(2) }}
		</td>
		<td>{{ time }}</td>
		<td>{{ transaction.event }}</td>
	</tr>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { TransactionEntity } from '@modules/payment'
import { useTimeDifference } from '@app/hooks/core/dates'
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
		return { time }
	}
})
</script>
