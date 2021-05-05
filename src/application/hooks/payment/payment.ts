import { Ref, ref } from '@nuxtjs/composition-api'
// @ts-ignore
import { client, hostedFields, paypalCheckout, HostedFields } from 'braintree-web'
import { GetClientToken, MakePayment } from '@modules/payment'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { getTwoDigits } from '@utils/dates'
import { isClient, isProd } from '@utils/environment'
import { useAuth } from '@app/hooks/auth/auth'

let props = {
	amount: 10 as number | null,
	// eslint-disable-next-line no-console
	afterPayment: ((res) => console.log(res)) as null | ((res: boolean) => void)
}
export const setPaymentProps = (prop: typeof props) => props = prop
const hostedFieldsInstance: Ref<HostedFields | null> = ref(null)

export const useMakePayment = () => {
	const { id } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const initializeHostedFields = async () => {
		if (isClient()) {
			const paypal = require('paypal-checkout')
			setLoading(true)
			const initializeFields = async () => {
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
				paypal.Button.render({
					env: isProd ? 'production' : 'sandbox',
					style: { label: 'paypal', size: 'large', shape: 'rect', color: 'gold', tagline: true },
					// @ts-ignore
					payment: () => paypalInstance.createPayment({ flow: 'vault', displayName: 'Stranerd', currency: 'USD' }),
					onAuthorize: async (info: any) => {
						if (!loading.value) {
							try {
								setLoading(true)
								const response = await paypalInstance.tokenizePayment(info)
								const res = await MakePayment.call(id.value, props.amount!, response.nonce)
								props.afterPayment?.(res)
							} catch (e) { setError(e) }
							setLoading(false)
						}
					},
					onCancel: () => setError('Account addition cancelled.'),
					onError: setError
				}, '#paypalButton')
			}
			await initializeFields().catch((e) => setError(e.message))
			setLoading(false)
		}
	}
	return {
		loading, error, ...props,
		initializeHostedFields
	}
}
