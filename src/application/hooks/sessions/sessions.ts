import { computed, Ref, ref, ssrRef, watch } from '@nuxtjs/composition-api'
import { AddSession, BeginSession, CancelSession, CancelSessionFactory, SessionFactory } from '@modules/sessions'
import { UserBio } from '@modules/users'
import { useAuth } from '@app/hooks/auth/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useSessionModal } from '@app/hooks/core/modals'
import { Alert } from '@app/hooks/core/notifications'

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
				await AddSession.call(factory.value)
				useSessionModal().closeSessionModal()
				factory.value.reset()
				setMessage('Session request successful.')
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

export const useSession = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { currentSessionId } = useAuth()

	const cancelSession = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to cancel this session',
			text: 'This cannot be undone',
			icon: 'info',
			confirmButtonText: 'Yes, cancel',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) useSessionModal().setSessionModalCancelling()
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
				if (currentSessionId.value) await BeginSession.call(currentSessionId.value)
				useSessionModal().closeSessionModal()
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { loading, error, cancelSession, acceptSession }
}

export const useCancelSession = () => {
	const factory = ssrRef(new CancelSessionFactory()) as Ref<CancelSessionFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { currentSessionId } = useAuth()

	const cancelSession = async () => {
		setError('')
		try {
			setLoading(true)
			if (currentSessionId.value) await CancelSession.call(currentSessionId.value, factory.value)
			factory.value.reset()
			useSessionModal().closeSessionModal()
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return { loading, error, cancelSession }
}
