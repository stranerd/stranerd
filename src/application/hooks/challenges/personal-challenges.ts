import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { reqSsrRef, useFetch, computed, Ref } from '@nuxtjs/composition-api'
import {
	CancelPersonalChallenge,
	ChallengeEntity, GetAllPersonalChallenges, ListenToPersonalChallenges,
	PersonalChallengeEntity, RetryPersonalChallenge, StartPersonalChallenge
} from '@modules/challenges'
import { useAuth } from '@app/hooks/auth/auth'
import { Alert } from '@app/hooks/core/notifications'

const global = {} as Record<string, {
	fetched: Ref<boolean>
	challenges: Ref<PersonalChallengeEntity[]>,
	error: Ref<string>, setError: (error: any) => void
	loading: Ref<boolean>, setLoading: (boolean: any) => void
}>

export const usePersonalChallengesList = (userId: string) => {
	const { currentChallenge } = useAuth()
	if (global[userId] === undefined) {
		global[userId] = {
			fetched: reqSsrRef(false),
			challenges: reqSsrRef([]),
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchChallenges = async () => {
		global[userId].setError('')
		if (!global[userId].fetched.value && userId) {
			global[userId].setLoading(true)
			try {
				global[userId].challenges.value = await GetAllPersonalChallenges.call(userId)
				global[userId].fetched.value = true
			} catch (error) { global[userId].setError(error) }
			global[userId].setLoading(false)
		}
	}

	useFetch(fetchChallenges)

	const listener = useListener(async () => {
		const cb = (challenges: PersonalChallengeEntity[]) => global[userId].challenges.value = challenges
		return userId ? await ListenToPersonalChallenges.call(userId, cb) : () => {}
	})

	const current = computed({
		get: () => global[userId].challenges.value
			.find((c) => c.id === currentChallenge.value) ?? null,
		set: () => {}
	})

	return { ...global[userId], listener, current }
}

export const useStartPersonalChallenge = () => {
	const { id } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	const startChallenge = async (challenge: ChallengeEntity) => {
		setError('')
		try {
			setLoading(true)
			if (id.value) await StartPersonalChallenge.call(id.value, challenge)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return { error, loading, startChallenge }
}

export const useRetryPersonalChallenge = () => {
	const { id } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	const retryChallenge = async (challenge: PersonalChallengeEntity) => {
		setError('')
		try {
			setLoading(true)
			if (id.value) await RetryPersonalChallenge.call(id.value, challenge)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return { error, loading, retryChallenge }
}

export const useCancelPersonalChallenge = () => {
	const { id } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	const cancelChallenge = async (challenge: PersonalChallengeEntity) => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to cancel this challenge?',
			text: 'This cannot be undone',
			icon: 'warning',
			confirmButtonText: 'Yes, cancel'
		})
		if (accepted) {
			try {
				setLoading(true)
				if (id.value) await CancelPersonalChallenge.call(id.value, challenge.id)
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { error, loading, cancelChallenge }
}
