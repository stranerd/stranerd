import { reqRef, useFetch } from '@nuxtjs/composition-api'
import { GetQuestions, ListenToQuestions, QuestionEntity } from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { PAGINATION_LIMIT } from '@utils/constants'

const global = {
	questions: reqRef([] as QuestionEntity[]),
	fetched: reqRef(false),
	hasMore: reqRef(false),
	listener: reqRef(null as null | (() => void))
}
const { error, setError: setGlobalError } = useErrorHandler()
const { loading, setLoading: setGlobalLoading } = useLoadingHandler()

const pushToQuestionList = (question: QuestionEntity) => {
	const index = global.questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global.questions.value.splice(index, 1, question)
	else global.questions.value.push(question)
}
const unshiftToQuestionList = (question: QuestionEntity) => {
	const index = global.questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global.questions.value.splice(index, 1, question)
	else global.questions.value.unshift(question)
}

export const useQuestionList = () => {
	const fetchQuestions = async () => {
		setGlobalError('')
		try {
			setGlobalLoading(true)
			const lastDate = global.questions
				.value[global.questions.value.length]
				.createdAt ?? undefined
			const questions = await GetQuestions.call(lastDate)
			global.hasMore.value = questions.length === PAGINATION_LIMIT + 1
			questions.slice(0, PAGINATION_LIMIT).forEach(pushToQuestionList)
		} catch (error) { setGlobalError(error) }
		setGlobalLoading(false)
	}
	const startQuestionListener = async () => {
		const appendQuestions = (questions: QuestionEntity[]) => { questions.map(unshiftToQuestionList) }
		const lastDate = global.questions
			.value[global.questions.value.length]
			.createdAt ?? undefined
		global.listener.value = await ListenToQuestions
			.call(appendQuestions, lastDate)
	}

	if (!global.fetched.value) useFetch(fetchQuestions)

	return {
		...global, error, loading,
		fetchOlderQuestions: fetchQuestions,
		startQuestionListener,
		closeQuestionListener: () => global.listener.value?.()
	}
}
