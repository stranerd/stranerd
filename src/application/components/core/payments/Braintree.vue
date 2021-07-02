<template>
	<form>
		<div class="form-group">
			<label>Credit Card Number</label>
			<div id="creditCardNumber" />
		</div>
		<div class="form-group">
			<div class="d-flex gap-0-5">
				<div class="flex-grow-1">
					<label>Expire Date</label>
					<div id="expireDate" />
				</div>
				<div class="flex-grow-1">
					<label>CVV</label>
					<div id="cvv" />
				</div>
			</div>
		</div>
		<button class="btn btn-blue w-100" :disabled="!hostedFieldsInstance" @click.prevent="pay">
			Pay
		</button>
		<hr>
		<div class="form-group text-center">
			<p class="mb-0-5">
				Pay With PayPal Instead
			</p>
			<div id="paypalButton" />
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useBraintreePayment } from '@app/hooks/payment/payment'
export default defineComponent({
	name: 'Braintree',
	setup () {
		const { loading, error, hostedFieldsInstance, amount, initializeHostedFields, pay } = useBraintreePayment()
		onMounted(initializeHostedFields)
		return { loading, error, hostedFieldsInstance, amount, pay }
	}
})
</script>
