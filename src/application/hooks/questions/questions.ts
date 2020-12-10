import { reqRef, useFetch, watch, computed, useContext } from '@nuxtjs/composition-api'
import {
	AddQuestion, FindQuestion, GetQuestions, ListenToQuestion,
	ListenToQuestions, QuestionEntity, QuestionFactory
} from '@modules/questions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { MINIMUM_CREDITS, PAGINATION_LIMIT } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'
import { useCreateModal } from '@app/hooks/core/modals'

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
				?.createdAt ?? undefined
			const questions = await GetQuestions.call(lastDate)
			global.hasMore.value = questions.length === PAGINATION_LIMIT + 1
			questions.slice(0, PAGINATION_LIMIT).forEach(pushToQuestionList)
			global.fetched.value = true
		} catch (error) { setGlobalError(error) }
		setGlobalLoading(false)
	}
	const startQuestionListener = async () => {
		const appendQuestions = (questions: QuestionEntity[]) => { questions.map(unshiftToQuestionList) }
		const lastDate = global.questions
			.value[global.questions.value.length]
			?.createdAt ?? undefined
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
export const useCreateQuestion = () => {
	const { id, bio, user, isLoggedIn } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useContext().app.router
	const credits = computed({
		get: () => {
			if (!isLoggedIn) {
				setError('Login to continue')
				return []
			}
			if (user.value!.account.credits < MINIMUM_CREDITS) {
				setError(`You need at least ${MINIMUM_CREDITS} credits to ask a question`)
				return []
			}
			const credits = []
			const maximum = user.value!.account.credits <= 100 ? user.value!.account.credits : 100
			for (let i = MINIMUM_CREDITS; i <= maximum; i = i + 5) credits.push(i)
			return credits
		}, set: () => {}
	})

	factory.value.userBioAndId = { id: id.value!, user: bio.value! }
	watch(() => id.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })
	watch(() => bio.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })

	const createQuestion = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				const questionId = await AddQuestion.call(factory.value)
				setMessage('Question submitted successfully')
				useCreateModal().closeCreateModal()
				await router?.push(`/questions/${questionId}`)
				factory.value.reset()
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		error, loading, factory, credits,
		createQuestion
	}
}

const fetchQuestion = async (id: string) => {
	let question = global.questions.value.find((q) => q.id === id) ?? null
	if (question) return question
	question = await FindQuestion.call(id)
	if (question) unshiftToQuestionList(question)
	return question
}
export const useQuestion = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const question = reqRef(null as QuestionEntity | null)
	const listener = reqRef(null as null | (() => void))

	const findQuestion = async () => {
		setError('')
		try {
			setLoading(true)
			question.value = await fetchQuestion(questionId)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	const startListener = async () => {
		const callback = (q: QuestionEntity | null) => {
			if (q) {
				question.value = q
				unshiftToQuestionList(q)
			}
		}
		listener.value = await ListenToQuestion.call(questionId, callback)
	}

	useFetch(findQuestion)

	return {
		error, loading, question,
		startListener,
		closeListener: () => listener.value?.()
	}
}
