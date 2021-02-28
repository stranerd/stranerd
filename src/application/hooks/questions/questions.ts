import { ssrRef, watch, computed, useRouter, useFetch } from '@nuxtjs/composition-api'
import {
	AddQuestion, FindQuestion, GetQuestions, ListenToQuestion,
	ListenToQuestions, QuestionEntity, QuestionFactory
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { COINS_GAP, MAXIMUM_COINS, MINIMUM_COINS, PAGINATION_LIMIT } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'
import { useCreateModal } from '@app/hooks/core/modals'
import { isServer } from '@utils/environment'

enum Answered {
	All,
	Answered,
	Unanswered
}
const answeredChoices = [
	{ val: Answered.All, key: 'All' },
	{ val: Answered.Answered, key: 'Answered' },
	{ val: Answered.Unanswered, key: 'Unanswered' }
]
const global = {
	questions: ssrRef([] as QuestionEntity[]),
	subjectId: ssrRef(''),
	answered: ssrRef(answeredChoices[0].val),
	fetched: ssrRef(false),
	hasMore: ssrRef(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

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
		global.setError('')
		// TODO: figure out logic to stop it from calling twice on server
		if (isServer()) global.questions.value = []
		try {
			global.setLoading(true)
			const lastDate = global.questions
				.value[global.questions.value.length - 1]
				?.createdAt
			const questions = await GetQuestions.call(lastDate ? new Date(lastDate) : undefined)
			global.hasMore.value = questions.length === PAGINATION_LIMIT + 1
			questions.slice(0, PAGINATION_LIMIT).forEach(pushToQuestionList)
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}
	const listener = useListener(async () => {
		const appendQuestions = (questions: QuestionEntity[]) => { questions.map(unshiftToQuestionList) }
		const lastDate = global.questions
			.value[global.questions.value.length - 1]
			?.createdAt ?? undefined
		return await ListenToQuestions
			.call(appendQuestions, lastDate ? new Date(lastDate) : undefined)
	})
	const filteredQuestions = computed({
		get: () => global.questions.value.filter((q) => {
			let matched = true
			if (global.subjectId.value && q.subjectId !== global.subjectId.value) matched = false
			if (global.answered.value === Answered.Answered && !q.isAnswered) matched = false
			if (global.answered.value === Answered.Unanswered && q.isAnswered) matched = false
			return matched
		}).sort((a, b) => {
			return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
		}), set: () => {}
	})

	if (!global.fetched.value || isServer()) useFetch(fetchQuestions)

	return {
		...global, listener,
		filteredQuestions, answeredChoices,
		fetchOlderQuestions: fetchQuestions
	}
}

const factory = ssrRef(new QuestionFactory())
export const useCreateQuestion = () => {
	const { id, bio, user, isLoggedIn } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()
	const coins = computed({
		get: () => {
			if (!isLoggedIn) {
				setError('Login to continue')
				return []
			}
			if (user.value!.account.coins.bronze < MINIMUM_COINS) {
				setError(`You need at least ${MINIMUM_COINS} coins to ask a question`)
				return []
			}
			const coins = []
			const maximum = user.value!.account.coins.bronze <= MAXIMUM_COINS ? user.value!.account.coins.bronze : MAXIMUM_COINS
			for (let i = MINIMUM_COINS; i <= maximum; i = i + COINS_GAP) coins.push(i)
			return coins
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
				await router.push(`/questions/${questionId}`)
				factory.value.reset()
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		error, loading, factory, coins,
		createQuestion
	}
}

export const useQuestion = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const question = computed({
		get: () => global.questions.value.find((q) => q.id === questionId) ?? null,
		set: () => {}
	})

	const fetchQuestion = async () => {
		setError('')
		try {
			setLoading(true)
			let question = global.questions.value.find((q) => q.id === questionId) ?? null
			if (question) {
				setLoading(false)
				return
			}
			question = await FindQuestion.call(questionId)
			if (question) unshiftToQuestionList(question)
		} catch (error) { setError(error) }
		setLoading(false)
	}
	const listener = useListener(async () => {
		let listener = () => {}
		const callback = (q: QuestionEntity | null) => {
			if (q) unshiftToQuestionList(q)
		}
		if (question.value) listener = await ListenToQuestion.call(questionId, callback)
		return listener
	})

	useFetch(fetchQuestion)

	return { error, loading, question, listener }
}
