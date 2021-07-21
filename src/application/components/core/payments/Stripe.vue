<template>
	<div v-if="isLoggedIn" class="p-1 d-flex flex-column">
		<StripeElementCard
			ref="cardRef"
			:pk="publicKey"
			:disabled="loading"
			@token="tokenCreated"
		/>
		<button class="btn btn-lg btn-primary w-100" :disabled="loading" @click="tokenize">
			Pay With Stripe
		</button>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useStripePayment } from '@app/hooks/payment/payment'
import { isClient, stripeConfig } from '@utils/environment'
import { getRandomValue } from '@utils/commons'

let StripeElementCard = null
if (isClient()) StripeElementCard = require('@vue-stripe/vue-stripe').StripeElementCard

export default defineComponent({
	name: 'Stripe',
	components: { StripeElementCard },
	setup (_, { refs }) {
		const { user, isLoggedIn } = useAuth()
		const { loading, error, pay, setLoading } = useStripePayment()
		// @ts-ignore
		const tokenize = () => refs.cardRef.submit()
		const tokenCreated = async (token: any) => await pay(token.id)

		return {
			user, isLoggedIn,
			publicKey: stripeConfig.publicKey,
			generateReference: getRandomValue,
			tokenCreated, tokenize,
			loading, error, setLoading
		}
	}
})
</script>
