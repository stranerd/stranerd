import { ssrRef, useFetch } from '@nuxtjs/composition-api'
import {
	GetAllChallenges, AddChallenge, FindChallenge, DeleteChallenge,
	ChallengeEntity, AnswerChallengeFactory
} from '@modules/challenges'
import { useCreateModal } from '@app/hooks/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { Alert } from '@app/hooks/core/notifications'
import { isServer } from '@utils/environment'

const global = {
	fetched: ssrRef(false),
	challenges: ssrRef([] as ChallengeEntity[])
}
const { error, setError: setGlobalError } = useErrorHandler()
const { loading, setLoading: setGlobalLoading } = useLoadingHandler()

export const addToGlobalChallenges = (challenge: ChallengeEntity) => {
	const index = global.challenges.value.findIndex((s) => s.id === challenge.id)
	if (index !== -1) global.challenges.value.splice(index, 1, challenge)
	else global.challenges.value.push(challenge)
}

const fetchChallenges = async () => {
	setGlobalError('')
	if (isServer()) global.challenges.value = []
	setGlobalLoading(true)
	try {
		global.challenges.value = await GetAllChallenges.call()
		global.fetched.value = true
	} catch (error) { setGlobalError(error) }
	setGlobalLoading(false)
}

export const useChallengeList = () => {
	if (!global.fetched.value || isServer()) useFetch(fetchChallenges)

	return { ...global, error, loading }
}

export const useChallenge = (id: string) => {
	const challenge = ssrRef(null as ChallengeEntity | null)
	const fetchChallenge = async () => {
		if (!global.fetched.value || isServer()) await fetchChallenges()
		const s = global.challenges.value.find((s) => s.id === id)
		challenge.value = s ?? null
	}
	useFetch(fetchChallenge)

	return { challenge }
}

export const useCreateChallenge = () => {
	const factory = ssrRef(new AnswerChallengeFactory())
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createChallenge = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const id = await AddChallenge.call(factory.value)
				const challenge = await FindChallenge.call(id)
				if (challenge) addToGlobalChallenges(challenge)
				factory.value.reset()
				useCreateModal().closeCreateModal()
				setMessage('Challenge created successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createChallenge }
}

export const useDeleteChallenge = (challenge: ChallengeEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteChallenge = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this challenge?',
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			setLoading(true)
			try {
				await DeleteChallenge.call(challenge.id)
				global.challenges.value = global.challenges.value
					.filter((s) => s.id !== challenge.id)
				setMessage('Challenge deleted successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { loading, error, deleteChallenge }
}
