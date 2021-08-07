import { ssrRef, watch, computed, useRouter, useFetch, ref, Ref } from '@nuxtjs/composition-api'
import {
	AddQuestion, EditQuestion, FindQuestion, GetQuestions, ListenToQuestion,
	ListenToQuestions, QuestionEntity, QuestionFactory
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { COINS_GAP, MAXIMUM_COINS, MINIMUM_COINS, PAGINATION_LIMIT } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'
import { analytics } from '@modules/core'
import VueRouter from 'vue-router'

enum Answered {
	All,
	BestAnswered,
	Answered,
	Unanswered
}
const answeredChoices = [
	{ val: Answered.All, key: 'All' },
	{ val: Answered.BestAnswered, key: 'Best Answered' },
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
		try {
			global.setLoading(true)
			const lastDate = global.questions.value[global.questions.value.length - 1]?.createdAt
			const questions = await GetQuestions.call(lastDate ? new Date(lastDate) : undefined)
			global.hasMore.value = questions.length === PAGINATION_LIMIT + 1
			questions.slice(0, PAGINATION_LIMIT).forEach(pushToQuestionList)
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}
	const listener = useListener(async () => {
		const appendQuestions = (questions: QuestionEntity[]) => { questions.map(unshiftToQuestionList) }
		const lastDate = global.questions.value[global.questions.value.length - 1]?.createdAt
		return await ListenToQuestions.call(appendQuestions, lastDate ? new Date(lastDate) : undefined)
	})
	const filteredQuestions = computed({
		get: () => global.questions.value.filter((q) => {
			if (global.subjectId.value && q.subjectId !== global.subjectId.value) return false
			if (global.answered.value === Answered.Answered && q.answers === 0) return false
			if (global.answered.value === Answered.Unanswered && q.answers > 0) return false
			if (global.answered.value === Answered.BestAnswered && !q.isAnswered) return false
			return true
		}).sort((a, b) => {
			return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
		}), set: (questions) => { questions.map(pushToQuestionList) }
	})

	const fetchOlderQuestions = async () => {
		await fetchQuestions()
		await listener.resetListener(async () => {
			const appendQuestions = (questions: QuestionEntity[]) => { questions.map(unshiftToQuestionList) }
			const lastDate = global.questions.value[global.questions.value.length - 1]?.createdAt
			return await ListenToQuestions.call(appendQuestions, lastDate ? new Date(lastDate) : undefined)
		})
	}

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchQuestions()
	})

	return {
		...global, listener,
		filteredQuestions, answeredChoices,
		fetchOlderQuestions
	}
}

const factory = ref(new QuestionFactory()) as Ref<QuestionFactory>
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
			const coins = [] as number[]
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
				factory.value.reset()
				await router.replace(`/questions/${questionId}`)
				analytics.logEvent('ask_question_completed', {
					questionId,
					subject: factory.value.subjectId
				})
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, coins, createQuestion }
}

export const useQuestion = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const question = computed({
		get: () => global.questions.value.find((q) => q.id === questionId) ?? null,
		set: (q) => { if (q) pushToQuestionList(q) }
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
		const callback = (q: QuestionEntity | null) => {
			if (q) unshiftToQuestionList(q)
		}
		return await ListenToQuestion.call(questionId, callback)
	})

	useFetch(fetchQuestion)

	return { error, loading, question, listener }
}

let editingQuestion = null as QuestionEntity | null
export const getEditingQuestion = () => editingQuestion
export const openQuestionEditModal = (question: QuestionEntity, router: VueRouter) => {
	editingQuestion = question
	router.push(`/questions/${question.id}/edit`)
}
export const useEditQuestion = (questionId: string) => {
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
			const coins = [] as number[]
			const maximum = user.value!.account.coins.bronze <= MAXIMUM_COINS ? user.value!.account.coins.bronze : MAXIMUM_COINS
			for (let i = MINIMUM_COINS; i <= maximum; i = i + COINS_GAP) coins.push(i)
			return coins
		}, set: () => {}
	})

	if (editingQuestion) factory.value.loadEntity(editingQuestion)
	watch(() => id.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })
	watch(() => bio.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })

	const editQuestion = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await EditQuestion.call(questionId, factory.value)
				setMessage('Question edited successfully')
				factory.value.reset()
				await router.replace(`/questions/${questionId}`)
				analytics.logEvent('edit_question_completed', {
					questionId,
					subject: factory.value.subjectId
				})
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, coins, editQuestion }
}
