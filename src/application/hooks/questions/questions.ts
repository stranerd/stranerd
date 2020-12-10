import { ref, ssrRef, useFetch, watch, computed, useContext } from '@nuxtjs/composition-api'
import {
	AddQuestion, FindQuestion, GetQuestions, ListenToQuestion,
	ListenToQuestions, QuestionEntity, QuestionFactory
} from '@modules/questions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { MINIMUM_CREDITS, PAGINATION_LIMIT } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'
import { useCreateModal } from '@app/hooks/core/modals'

const global = {
	questions: ssrRef([] as QuestionEntity[]),
	fetched: ssrRef(false),
	hasMore: ssrRef(false),
	listener: (null as null | (() => void))
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
	const subjectId = ref('')
	const answeredChoices = [{ val: 0, key: 'All' }, { val: 1, key: 'Answered' }, { val: 2, key: 'Unanswered' }]
	const answered = ref(answeredChoices[0].val)
	const fetchQuestions = async () => {
		setGlobalError('')
		try {
			setGlobalLoading(true)
			const lastDate = global.questions
				.value[global.questions.value.length]
				?.createdAt
			const questions = await GetQuestions.call(lastDate ? new Date(lastDate) : undefined)
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
		global.listener = await ListenToQuestions
			.call(appendQuestions, lastDate ? new Date(lastDate) : undefined)
	}
	const filteredQuestions = computed({
		get: () => global.questions.value.filter((q) => {
			let matched = true
			if (subjectId.value && q.subjectId !== subjectId.value) matched = false
			if (answered.value === 1 && !q.isAnswered) matched = false
			if (answered.value === 2 && q.isAnswered) matched = false
			return matched
		}), set: () => {}
	})

	if (!global.fetched.value) useFetch(fetchQuestions)

	return {
		...global, error, loading,
		filteredQuestions, subjectId, answeredChoices, answered,
		fetchOlderQuestions: fetchQuestions,
		startQuestionListener,
		closeQuestionListener: () => global.listener?.()
	}
}

const factory = ssrRef(new QuestionFactory())
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
	const question = ref(null as QuestionEntity | null)
	let listener = (null as null | (() => void))

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
		listener = await ListenToQuestion.call(questionId, callback)
	}

	useFetch(findQuestion)

	return {
		error, loading, question,
		startListener,
		closeListener: () => listener?.()
	}
}
