<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Make Purchase of ${{ amount }}
				</h4>
				<a @click.prevent="closePaymentModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<form>
			<div class="form-group">
				<label>Credit Card Number</label>
				<div id="creditCardNumber" class="form-control" />
			</div>
			<div class="form-group">
				<div class="row">
					<div class="col-6">
						<label>Expire Date</label>
						<div id="expireDate" class="form-control" />
					</div>
					<div class="col-6">
						<label>CVV</label>
						<div id="cvv" class="form-control" />
					</div>
				</div>
			</div>
			<button class="btn btn-blue btn-block" :disabled="!hostedFieldsInstance" @click.prevent="pay">
				Pay
			</button>
			<hr>
			<div class="form-group text-center">
				<div id="paypalButton" />
			</div>
		</form>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useMakePayment } from '@app/hooks/payment/payment'
import { usePaymentModal } from '@app/hooks/core/modals'
export default defineComponent({
	setup () {
		const { loading, error, hostedFieldsInstance, amount, initializeHostedFields, pay } = useMakePayment()
		onMounted(initializeHostedFields)
		return {
			loading, error, hostedFieldsInstance, amount,
			pay, closePaymentModal: usePaymentModal().closePaymentModal
		}
	}
})
</script>
