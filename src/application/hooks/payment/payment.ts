import { MakeStripePayment } from '@modules/meta'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { stripeConfig } from '@utils/environment'
import { usePaymentModal } from '@app/hooks/core/modals'
import { analytics } from '@modules/core'
import { loadStripe } from '@stripe/stripe-js'
import { useAuth } from '@app/hooks/auth/auth'

let props = {
	amount: null as number | null,
	afterPayment: null as null | ((res: boolean) => Promise<void>)
}
export const setPaymentProps = (prop: typeof props) => props = prop

export const useFlutterwavePayment = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const pay = async (successful: boolean) => {
		setError('')
		setLoading(true)
		try {
			usePaymentModal().closeMakePayment()
			await props.afterPayment?.(successful)
			// @ts-ignore
			analytics.logEvent('purchase', {
				value: props.amount!
			})
		} catch (e) { setError(e) }
		setLoading(false)
	}

	return { error, loading, pay, amount: props.amount }
}

export const useStripePayment = () => {
	const { getLocalAmount, getLocalCurrency } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const pay = async (token: string) => {
		setError('')
		setLoading(true)
		try {
			const stripe = await loadStripe(stripeConfig.publicKey)
			if (!stripe) return setLoading(false)
			const clientSecret = await MakeStripePayment.call(getLocalAmount(props.amount!), getLocalCurrency())
			const res = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: { token }
				}
			})
			if (res.error) throw new Error(res.error.message)
			const succeeded = res.paymentIntent.status === 'succeeded'
			usePaymentModal().closeMakePayment()
			await props.afterPayment?.(succeeded)
			// @ts-ignore
			analytics.logEvent('purchase', {
				value: props.amount!
			})
		} catch (e) { setError(e) }
		setLoading(false)
	}

	return { error, loading, pay, setLoading }
}
