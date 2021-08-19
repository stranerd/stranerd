import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { Ref, ref, watch, useRouter } from '@nuxtjs/composition-api'
import { ProfileUpdateFactory, UpdateProfile } from '@modules/auth'
import { useAuth } from '@app/hooks/auth/auth'
import { useAccountModal, usePaymentModal } from '@app/hooks/core/modals'
import { BuyCoins, TipTutor } from '@modules/meta'
import { UserBio } from '@modules/users'
import { setPaymentProps } from '@app/hooks/payment/payment'
import { Alert } from '@app/hooks/core/notifications'
import { analytics } from '@modules/core'

export const useUpdateProfile = () => {
	const router = useRouter()
	// @ts-ignore
	const factory = ref(new ProfileUpdateFactory()) as Ref<ProfileUpdateFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.value.loadEntity(user.value)
	watch(() => user.value?.bio.name.last, () => user.value?.bio.name ? factory.value.last = user.value.bio.name.last : null)
	watch(() => user.value?.email, () => user.value?.email ? factory.value.email = user.value.email : null)
	watch(() => user.value?.description, () => user.value?.description ? factory.value.description = user.value.description : null)
	watch(() => user.value?.avatar, () => user.value?.avatar ? factory.value.avatar = user.value.avatar : null)
	watch(() => user.value?.avatar, () => user.value?.avatar ? factory.value.avatar = user.value.avatar : null)

	const updateProfile = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await UpdateProfile.call(factory.value)
				await router.replace('/account/')
				setMessage('Profile updated successfully!')
			} catch (error) { setError(error) }
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
	{ amount: 1000, price: 0.99, src: '/images/buyCoins/bronze-1.svg' },
	{ amount: 2000, price: 1.99, src: '/images/buyCoins/bronze-2.svg' },
	{ amount: 5000, price: 4.99, src: '/images/buyCoins/bronze-3.svg', suggested: true },
	{ amount: 10000, price: 9.99, src: '/images/buyCoins/bronze-4.svg' }
]
const GOLD_PRICES = [
	{ amount: 10, price: 0.99, src: '/images/buyCoins/gold-1.svg' },
	{ amount: 50, price: 4.99, src: '/images/buyCoins/gold-2.svg' },
	{ amount: 100, price: 9.99, src: '/images/buyCoins/gold-3.svg', suggested: true },
	{ amount: 500, price: 49.99, src: '/images/buyCoins/gold-4.svg' }
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
						} catch (e) { setError(e) }
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

let nerdBioAndId = null as { id: string, bio: UserBio } | null
export const setNerdBioAndId = ({ id, bio }: { id: string, bio: UserBio }) => {
	nerdBioAndId = { id, bio }
}

export const useTipTutor = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const TIP_AMOUNTS = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 40, 45, 50]

	const tipTutor = async (amount: number) => {
		if (!nerdBioAndId) useAccountModal().closeTipTutor()
		if (!loading.value) {
			setError('')
			const result = await Alert({
				icon: 'info',
				cancelButtonText: 'No, cancel',
				confirmButtonText: 'Yes, proceed',
				title: `Tip ${amount} coins`,
				text: `Are you sure you want to tip ${amount} coins?`
			})
			if (result) {
				try {
					setLoading(true)
					await TipTutor.call(amount, nerdBioAndId!.id)
					useAccountModal().closeTipTutor()
					setMessage('Tipped successfully')
					analytics.logEvent('tip_nerd_completed', { amount })
				} catch (e) { setError(e) }
				setLoading(false)
			}
		}
	}

	return {
		loading, error, message, nerdBioAndId,
		tipTutor, TIP_AMOUNTS
	}
}
