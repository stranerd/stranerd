import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetUserAnswers, AnswerEntity } from '@modules/questions'
import { PAGINATION_LIMIT } from '@utils/constants'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>,
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToAnswerList = (id: string, answer: AnswerEntity) => {
	const index = global[id].answers.value.findIndex((a) => a.id === answer.id)
	if (index !== -1) global[id].answers.value.splice(index, 1, answer)
	else global[id].answers.value.push(answer)
}

export const useUserAnswerList = (id: string) => {
	if (!global[id]) global[id] = {
		answers: ssrRef([]),
		fetched: ssrRef(false),
		hasMore: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAnswers = async () => {
		global[id].setError('')
		if (!id) return
		try {
			global[id].setLoading(true)
			const lastDate = global[id].answers.value[global[id].answers.value.length - 1]?.createdAt
			const answers = await GetUserAnswers.call(id, lastDate ? new Date(lastDate) : undefined)
			global[id].hasMore.value = answers.length === PAGINATION_LIMIT + 1
			answers.slice(0, PAGINATION_LIMIT).forEach((a) => pushToAnswerList(id, a))
			global[id].fetched.value = true
		} catch (error) { global[id].setError(error) }
		global[id].setLoading(false)
	}

	useFetch(async () => {
		if (!global[id].fetched.value) await fetchAnswers()
	})

	return { ...global[id], fetchOlderAnswers: fetchAnswers }
}
