import { reqRef, useFetch } from '@nuxtjs/composition-api'
import { AddQuestion, GetQuestions, ListenToQuestions, QuestionEntity, QuestionFactory } from '@modules/questions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { PAGINATION_LIMIT } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'

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

const factory = reqRef(new QuestionFactory())
export const createQuestion = () => {
	const { id, bio } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	factory.value.userBioAndId = { id: id.value!, user: bio.value! }

	const createQuestion = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				factory.value.userBioAndId = { id: id.value!, user: bio.value! }
				const questionId = await AddQuestion.call(factory.value)
				setMessage(`Question asked successfully with id: ${questionId}`)
				factory.value.reset()
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		error, loading, factory,
		createQuestion
	}
}
