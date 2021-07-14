import { computed, Ref, ref, reqRef, useRouter, watch } from '@nuxtjs/composition-api'
import { AddSession, BeginSession, CancelSession, SessionFactory } from '@modules/sessions'
import { UserBio } from '@modules/users'
import { RateTutor } from '@modules/meta'
import { useAuth } from '@app/hooks/auth/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useSessionModal } from '@app/hooks/core/modals'
import { Alert } from '@app/hooks/core/notifications'
import { analytics } from '@modules/core'

const SESSION_PRICES = {
	15: 10,
	30: 20,
	60: 40,
	120: 80,
	180: 120
}

let newSessionTutorIdBio = null as null | { id: string, user: UserBio }
export const setNewSessionTutorIdBio = (data: { id: string, user: UserBio }) => { newSessionTutorIdBio = data }

export const useCreateSession = () => {
	const { id, bio, user } = useAuth()
	const router = useRouter()
	const factory = ref(new SessionFactory()) as Ref<SessionFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	factory.value.tutorBioAndId = newSessionTutorIdBio!
	factory.value.studentBioAndId = { id: id.value, user: bio.value! }
	watch(() => id.value, () => factory.value.studentBioAndId = { id: id.value!, user: bio.value! })
	watch(() => bio.value, () => factory.value.studentBioAndId = { id: id.value!, user: bio.value! })
	const prices = computed({
		get: () => {
			const entries = Object.entries(SESSION_PRICES)
			entries.sort((a, b) => a[1] - b[1])
			return entries.map((arr) => ({ duration: parseFloat(arr[0]), price: arr[1] }))
		},
		set: () => {}
	})
	watch(() => factory.value.duration, () => factory.value.price = SESSION_PRICES[factory.value.duration as keyof typeof SESSION_PRICES])

	const createSession = async () => {
		setError('')
		const hasEnoughCoins = factory.value.price < (user.value?.account?.coins?.gold ?? 0)
		if (factory.value.valid && hasEnoughCoins && !loading.value) {
			try {
				setLoading(true)
				const sessionId = await AddSession.call(factory.value)
				useSessionModal().closeCreateSession()
				await router.push('/sessions')
				factory.value.reset()
				setMessage('Session request successful.')
				analytics.logEvent('session_request', { sessionId })
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		prices,
		factory, loading, error,
		createSession
	}
}

export const useSession = (sessionId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const cancelSession = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to cancel this session',
			text: 'This cannot be undone',
			icon: 'info',
			confirmButtonText: 'Yes, cancel',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				setLoading(true)
				if (sessionId) await CancelSession.call(sessionId)
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	const acceptSession = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to accept this session',
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, accept',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				setLoading(true)
				if (sessionId) await BeginSession.call(sessionId)
				analytics.logEvent('session_accepted', { sessionId })
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { loading, error, cancelSession, acceptSession }
}

let otherParticipantId = null as null | string
export const setOtherParticipantId = (id: string) => { otherParticipantId = id }

export const useRateSession = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const rating = reqRef(0)
	const review = reqRef('')

	const rateSession = async () => {
		if (!otherParticipantId) return
		if (rating.value || review.value) {
			setError('')
			setLoading(true)
			try {
				await RateTutor.call(otherParticipantId, rating.value, review.value)
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return {
		loading, error, rating, review,
		rateSession
	}
}
