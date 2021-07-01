<template>
	<div>
		<flutterwave-pay-button
			v-if="isLoggedIn"
			:tx_ref="generateReference()"
			:amount="20"
			currency="USD"
			payment_options="card,ussd"
			redirect_url=""
			class="btn btn-primary"
			style=""
			:meta="{
				consumer_id: user.id
			}"
			:customer="{
				name: user.fullName,
				email: user.email
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
import { analytics } from '@modules/core/services/initFirebase'
export default defineComponent({
	name: 'Flutterwave',
	setup () {
		const { user, isLoggedIn } = useAuth()
		const { loading, error, setLoading, amount, afterPayment } = useFlutterwavePayment()
		const makePaymentCallback = async (response: any) => {
			setLoading(true)
			await afterPayment?.(response.status === 'successful')
			// @ts-ignore
			analytics.logEvent('purchase', {
				value: amount!
			})
			setLoading(false)
		}
		const closedPaymentModal = () => 'closed'
		return {
			makePaymentCallback, closedPaymentModal, generateReference: getRandomValue,
			isLoggedIn, user, logo,
			amount, loading, error
		}
	}
})
</script>
