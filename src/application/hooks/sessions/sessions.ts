import { computed, Ref, ref, ssrRef, useRouter, watch } from '@nuxtjs/composition-api'
import { AddSession, BeginSession, CancelSession, SessionFactory } from '@modules/sessions'
import { UserBio } from '@modules/users'
import { RateTutor } from '@modules/meta'
import { useAuth } from '@app/hooks/auth/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useSessionModal } from '@app/hooks/core/modals'
import { Alert } from '@app/hooks/core/notifications'
import { analytics } from '@modules/core'

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
	const hasEnoughCoins = computed({
		get: () => factory.value.price <= (user.value?.account?.coins?.gold ?? 0),
		set: () => {}
	})

	const createSession = async () => {
		setError('')
		if (factory.value.valid && hasEnoughCoins.value && !loading.value) {
			try {
				setLoading(true)
				const sessionId = await AddSession.call(factory.value)
				useSessionModal().closeCreateSession()
				await router.push(`/sessions/${newSessionTutorIdBio?.id}`)
				factory.value.reset()
				setMessage('Session request successful.')
				analytics.logEvent('session_request', { sessionId })
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, loading, error, hasEnoughCoins,
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
				if (sessionId) await BeginSession.call(sessionId, true)
				analytics.logEvent('session_accepted', { sessionId, accepted: true })
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	const rejectSession = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to reject this session',
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, reject',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				setLoading(true)
				if (sessionId) await BeginSession.call(sessionId, false)
				analytics.logEvent('session_accepted', { sessionId, accepted: false })
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { loading, error, cancelSession, acceptSession, rejectSession }
}

let otherParticipantId = null as null | string
export const setOtherParticipantId = (id: string) => { otherParticipantId = id }

export const useRateSession = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const rating = ssrRef(0)
	const review = ssrRef('')

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
