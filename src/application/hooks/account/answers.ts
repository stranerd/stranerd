import { reqSsrRef, useFetch } from '@nuxtjs/composition-api'
import { GetMyAnswers, AnswerEntity } from '@modules/questions'
import { PAGINATION_LIMIT } from '@utils/constants'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const global = {
	answers: reqSsrRef([] as AnswerEntity[]),
	fetched: reqSsrRef(false),
	hasMore: reqSsrRef(true)
}
const { error, setError: setGlobalError } = useErrorHandler()
const { loading, setLoading: setGlobalLoading } = useLoadingHandler()

const pushToAnswerList = (answer: AnswerEntity) => {
	const index = global.answers.value.findIndex((q) => q.id === answer.id)
	if (index !== -1) global.answers.value.splice(index, 1, answer)
	else global.answers.value.push(answer)
}

export const useMyAnswerList = () => {
	const { id } = useAuth()
	const fetchAnswers = async () => {
		setGlobalError('')
		try {
			setGlobalLoading(true)
			const lastDate = global.answers
				.value[global.answers.value.length]
				?.createdAt
			const answers = await GetMyAnswers.call(id.value ?? '', lastDate ? new Date(lastDate) : undefined)
			global.hasMore.value = answers.length === PAGINATION_LIMIT + 1
			answers.slice(0, PAGINATION_LIMIT).forEach(pushToAnswerList)
			global.fetched.value = true
		} catch (error) { setGlobalError(error) }
		setGlobalLoading(false)
	}

	if (!global.fetched.value) useFetch(fetchAnswers)

	return {
		...global, error, loading,
		fetchOlderAnswers: fetchAnswers
	}
}
