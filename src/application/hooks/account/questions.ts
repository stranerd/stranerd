import { reqSsrRef, useFetch } from '@nuxtjs/composition-api'
import { GetMyQuestions, QuestionEntity } from '@modules/questions'
import { PAGINATION_LIMIT } from '@utils/constants'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const global = {
	questions: reqSsrRef([] as QuestionEntity[]),
	fetched: reqSsrRef(false),
	hasMore: reqSsrRef(false)
}
const { error, setError: setGlobalError } = useErrorHandler()
const { loading, setLoading: setGlobalLoading } = useLoadingHandler()

const pushToQuestionList = (question: QuestionEntity) => {
	const index = global.questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global.questions.value.splice(index, 1, question)
	else global.questions.value.push(question)
}

export const useMyQuestionList = () => {
	const { id } = useAuth()
	const fetchQuestions = async () => {
		setGlobalError('')
		try {
			setGlobalLoading(true)
			const lastDate = global.questions
				.value[global.questions.value.length]
				?.createdAt
			const questions = await GetMyQuestions.call(id.value ?? '', lastDate ? new Date(lastDate) : undefined)
			global.hasMore.value = questions.length === PAGINATION_LIMIT + 1
			questions.slice(0, PAGINATION_LIMIT).forEach(pushToQuestionList)
			global.fetched.value = true
		} catch (error) { setGlobalError(error) }
		setGlobalLoading(false)
	}

	if (!global.fetched.value) useFetch(fetchQuestions)

	return {
		...global, error, loading,
		fetchOlderQuestions: fetchQuestions
	}
}
