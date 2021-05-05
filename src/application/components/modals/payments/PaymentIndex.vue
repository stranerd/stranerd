<template>
	<div>
		<MakePayment v-if="isPaymentModalMakePayment" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePaymentModal } from '@app/hooks/core/modals'
import MakePayment from '@app/components/modals/payments/MakePayment.vue'
export default defineComponent({
	name: 'PaymentModalIndex',
	components: { MakePayment },
	setup () {
		const { isPaymentModalMakePayment } = usePaymentModal()
		return { isPaymentModalMakePayment }
	}
})
</script>
