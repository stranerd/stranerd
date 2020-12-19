import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { reqSsrRef, useFetch, computed } from '@nuxtjs/composition-api'
import { GetAllPersonalChallenges, ListenToPersonalChallenges, PersonalChallengeEntity } from '@modules/challenges'
import { useAuth } from '@app/hooks/auth/auth'

const global = {
	userId: null as string | null,
	fetched: reqSsrRef(false),
	challenges: reqSsrRef([] as PersonalChallengeEntity[])
}
const { error, setError: setGlobalError } = useErrorHandler()
const { loading, setLoading: setGlobalLoading } = useLoadingHandler()

const fetchChallenges = async (userId: string) => {
	setGlobalError('')
	if (!global.fetched.value) {
		setGlobalLoading(true)
		try {
			global.challenges.value = await GetAllPersonalChallenges.call(userId)
			global.fetched.value = true
		} catch (error) { setGlobalError(error) }
		setGlobalLoading(false)
	}
}

export const usePersonalChallengesList = () => {
	const { id, currentChallenge } = useAuth()
	useFetch(async () => {
		if (id.value && global.userId !== id.value) {
			await fetchChallenges(id.value)
			global.userId = id.value
		} else if (!id.value) {
			global.challenges.value = []
			global.userId = null
		}
	})

	const listener = useListener(async () => {
		if (!id.value) return () => {}
		const cb = (challenges: PersonalChallengeEntity[]) => global.challenges.value = challenges
		return await ListenToPersonalChallenges.call(id.value, cb)
	})

	const current = computed({
		get: () => global.challenges.value.find((c) => c.id === currentChallenge.value) ?? null,
		set: () => {}
	})

	return { ...global, error, loading, listener, current }
}
