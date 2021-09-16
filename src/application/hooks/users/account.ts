import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { Ref, ref, useRouter, watch } from '@nuxtjs/composition-api'
import { ProfileUpdateFactory, UpdateProfile } from '@modules/auth'
import { useAuth } from '@app/hooks/auth/auth'
import { useAccountModal, usePaymentModal } from '@app/hooks/core/modals'
import { BuyCoins } from '@modules/meta'
import { setPaymentProps } from '@app/hooks/payment/payment'
import { analytics } from '@modules/core'

export const useUpdateProfile = () => {
	const router = useRouter()
	const factory = ref(new ProfileUpdateFactory()) as Ref<ProfileUpdateFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.value.loadEntity(user.value)
	watch(() => user.value?.hash, () => user.value ? factory.value.loadEntity(user.value) : null)

	const updateProfile = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await UpdateProfile.call(factory.value)
				await router.push('/account/')
				setMessage('Profile updated successfully!')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		error, loading,
		factory,
		updateProfile
	}
}

const BRONZE_PRICES = [
	{ amount: 300, price: 0.99, src: '/images/buyCoins/bronze-1.svg' },
	{ amount: 500, price: 1.99, src: '/images/buyCoins/bronze-2.svg' }
]
const GOLD_PRICES = [
	{ amount: 10, price: 0.99, src: '/images/buyCoins/gold-1.svg' },
	{ amount: 50, price: 4.99, src: '/images/buyCoins/gold-2.svg' }
]

export const useBuyCoins = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const buyCoins = async (option: typeof BRONZE_PRICES[0], isGold: boolean) => {
		setPaymentProps({
			amount: option.price,
			afterPayment: async (res: boolean) => {
				if (res) {
					if (!loading.value) {
						try {
							setLoading(true)
							await BuyCoins.call(option.amount, isGold)
							useAccountModal().closeBuyCoins()
							analytics.logEvent('buy_coins_end', {
								amount: option.amount,
								price: option.price,
								isGold
							})
							setMessage('Coins purchased successfully')
						} catch (e) {
							setError(e)
						}
						setLoading(false)
					}
				}
			}
		})
		usePaymentModal().openMakePayment()
	}

	return {
		loading, error, message, buyCoins,
		BRONZE_PRICES, GOLD_PRICES
	}
}
