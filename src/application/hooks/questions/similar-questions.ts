import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetSimilarQuestions, ListenToSimilarQuestions, QuestionEntity } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useSimilarQuestionList = (question: QuestionEntity) => {
	if (global[question.id] === undefined) global[question.id] = {
		questions: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		global[question.id].setError('')
		try {
			global[question.id].setLoading(true)
			global[question.id].questions.value = (await GetSimilarQuestions.call(question.id, question.tags)).results
			global[question.id].fetched.value = true
		} catch (error) {
			global[question.id].setError(error)
		}
		global[question.id].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (questions: QuestionEntity[]) => {
			global[question.id].questions.value = questions.filter((q) => q.id !== question.id).slice(0, 10)
		}
		return await ListenToSimilarQuestions.call(question.tags, callback)
	})

	useFetch(async () => {
		if (!global[question.id].fetched.value && !global[question.id].loading.value) await fetchQuestions()
	})

	return {
		error: global[question.id].error,
		loading: global[question.id].loading,
		questions: global[question.id].questions,
		listener
	}
}
