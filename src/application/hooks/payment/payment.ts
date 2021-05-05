import { computed, Ref, ref } from '@nuxtjs/composition-api'
// @ts-ignore
import { client, hostedFields, paypalCheckout, HostedFields } from 'braintree-web'
// @ts-ignore
import { AuthorizationData, Button } from 'paypal-checkout'
import { GetClientToken, MakePayment } from '@modules/payment'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { getTwoDigits } from '@utils/dates'
import { isProd } from '@utils/environment'
import { useAuth } from '@app/hooks/auth/auth'

const hostedFieldsInstance: Ref<HostedFields | null> = ref(null)

const initializeFields = async (onAuthorization: (nonce: string) => void,
	errorHandler: (error: string) => void
) => {
	const { braintree: braintreeToken, paypal: paypalToken } = await GetClientToken.call()
	const clientInstance = await client.create({ authorization: braintreeToken })
	const now = new Date()
	const month = getTwoDigits(now.getMonth() + 1)
	const year = now.getFullYear()
	const options = {
		client: clientInstance,
		styles: { input: { 'font-size': '14px' } },
		fields: {
			number: { selector: '#creditCardNumber', placeholder: 'Enter Credit Card' },
			cvv: { selector: '#cvv', placeholder: 'Enter CVV' },
			expirationDate: { selector: '#expireDate', placeholder: `${month}/${year + 1}` }
		}
	}
	hostedFieldsInstance.value = await hostedFields.create(options)
	const paypalInstance = await paypalCheckout.create({ client: clientInstance, authorization: paypalToken })
	Button.render({
		env: isProd ? 'production' : 'sandbox',
		style: { label: 'paypal', size: 'large', shape: 'rect', color: 'gold', tagline: true },
		// @ts-ignore
		payment: () => paypalInstance.createPayment({ flow: 'vault', displayName: 'Stranerd', currency: 'USD' }),
		onAuthorize: async (info: AuthorizationData) => {
			const response = await paypalInstance.tokenizePayment(info)
			onAuthorization(response.nonce)
			return response
		},
		onCancel: () => errorHandler('Account addition cancelled.'),
		onError: errorHandler
	}, '#paypalButton')
}

export const usePaymentForm = (onAuthorization: (nonce: string) => void) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const initializeHostedFields = async () => {
		setLoading(true)
		await initializeFields(onAuthorization, setError)
			.catch((e) => setError(e.message))
		setLoading(false)
	}
	return {
		loading, error,
		isThereAHoistedFieldInstance: computed(() => !!hostedFieldsInstance.value),
		initializeHostedFields
	}
}

export const useMakePayment = () => {
	const { id } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const makePayment = async (amount: number, token: string) => {
		if (!loading.value) {
			setLoading(true)
			try {
				const res = await MakePayment.call(id.value, amount, token)
				if (res) setMessage('Payment successful')
				else setError('Payment unsuccessful')
				setLoading(false)
				return res
			} catch (e) { setError(e) }
			setLoading(false)
		}
		return false
	}

	return {
		loading, error, message,
		makePayment
	}
}
