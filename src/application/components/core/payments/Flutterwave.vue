<template>
	<div class="d-flex flex-column">
		<flutterwave-pay-button
			:tx_ref="getRandomValue()"
			:amount="amount"
			:currency="getLocalCurrency()"
			payment_options="card,ussd"
			redirect_url=""
			class="btn btn-primary btn-lg mx-auto"
			style=""
			:meta="{
				consumer_id: user && user.id
			}"
			:customer="{
				name: user && user.fullName,
				email: user && user.email
			}"
			:customizations="{
				title: 'Stranerd' ,
				description: '',
				logo : logo
			}"
			:callback="makePaymentCallback"
			:onclose="closedPaymentModal"
		>
			Click To Pay With Flutterwave
		</flutterwave-pay-button>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { getRandomValue } from '@utils/commons'
import { logo } from '@utils/environment'
import { useFlutterwavePayment } from '@app/hooks/payment/payment'
export default defineComponent({
	name: 'Flutterwave',
	setup () {
		const { user, getLocalCurrency } = useAuth()
		const { loading, error, amount, pay } = useFlutterwavePayment()
		const makePaymentCallback = async (response: any) => await pay(response.status === 'successful')
		const closedPaymentModal = () => 'closed'
		return {
			makePaymentCallback, closedPaymentModal, getRandomValue,
			user, logo, getLocalCurrency,
			amount, loading, error
		}
	}
})
</script>
