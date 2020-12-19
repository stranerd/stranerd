import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { reqSsrRef, useFetch } from '@nuxtjs/composition-api'
import { GetAllPersonalChallenges, PersonalChallengeEntity } from '@modules/challenges'
import { useAuth } from '@app/hooks/auth/auth'

const global = {
	userId: '',
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
	const { id } = useAuth()
	useFetch(async () => {
		if (id.value && global.userId !== id.value) {
			await fetchChallenges(id.value)
			global.userId = id.value
		} else if (!id.value) global.challenges.value = []
	})

	/* const listener = useListener(async () => {
		return await
	}) */

	return { ...global, error, loading }
}
