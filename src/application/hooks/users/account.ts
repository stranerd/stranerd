import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { Ref, ssrRef, watch } from '@nuxtjs/composition-api'
import { ProfileUpdateFactory, UpdateProfile } from '@modules/auth'
import { useAuth } from '@app/hooks/auth/auth'
import { useModal, usePaymentModal } from '@app/hooks/core/modals'
import { BuyCoins, TipNerd } from '@modules/payment'
import { UserBio } from '@modules/users'
import { setPaymentProps } from '@app/hooks/payment/payment'
import { Alert } from '@app/hooks/core/notifications'
import { analytics } from '@modules/core/services/initFirebase'

export const useUpdateProfile = () => {
	const factory = ssrRef(new ProfileUpdateFactory()) as Ref<ProfileUpdateFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { id, bio } = useAuth()

	if (bio.value) factory.value.loadEntity(bio.value)
	watch(() => bio.value?.name.first, () => bio.value?.name ? factory.value.first = bio.value.name.first : null)
	watch(() => bio.value?.name.last, () => bio.value?.name ? factory.value.last = bio.value.name.last : null)
	watch(() => bio.value?.email, () => bio.value?.email ? factory.value.email = bio.value.email : null)
	watch(() => bio.value?.description, () => bio.value?.description ? factory.value.description = bio.value.description : null)
	watch(() => bio.value?.avatar, () => bio.value?.avatar ? factory.value.avatar = bio.value.avatar : null)

	const updateProfile = async () => {
		setError('')
		if (id.value && factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await UpdateProfile.call(id.value, factory.value)
				useModal().removeFromStack('EditAccountProfile')
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
	{ amount: 5000, price: 4.99, src: '/images/buyCoins/bronze-3.svg' },
	{ amount: 10000, price: 9.99, src: '/images/buyCoins/bronze-4.svg' }
]
const GOLD_PRICES = [
	{ amount: 10, price: 0.99, src: '/images/buyCoins/gold-1.svg' },
	{ amount: 50, price: 4.99, src: '/images/buyCoins/gold-2.svg' },
	{ amount: 100, price: 9.99, src: '/images/buyCoins/gold-3.svg' },
	{ amount: 500, price: 49.99, src: '/images/buyCoins/gold-4.svg' }
]

export const useBuyCoins = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const buyCoins = async (option: typeof BRONZE_PRICES[0], isGold: boolean) => {
		analytics.logEvent('buy_coins_end', {
			amount: option.amount,
			price: option.price,
			isGold
		})
		await setPaymentProps({
			amount: option.price,
			afterPayment: async (res: boolean) => {
				if (res) {
					if (!loading.value) {
						try {
							setLoading(true)
							await BuyCoins.call(option.amount, isGold)
							useModal().removeFromStack('BuyCoins')
							setMessage('Coins purchased successfully')
						} catch (e) { setError(e) }
						setLoading(false)
					}
				}
			}
		})
		usePaymentModal().setPaymentModalMakePayment()
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

export const useTipNerd = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const TIP_AMOUNTS = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 40, 45, 50]

	const tipNerd = async (amount: number) => {
		if (!nerdBioAndId) useModal().removeFromStack('TipNerd')
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
					await TipNerd.call(amount, nerdBioAndId!.id)
					useModal().removeFromStack('TipNerd')
					setMessage('Tipped successfully')
					analytics.logEvent('tip_nerd_completed', { amount })
				} catch (e) { setError(e) }
				setLoading(false)
			}
		}
	}

	return {
		loading, error, message, nerdBioAndId,
		tipNerd, TIP_AMOUNTS
	}
}
