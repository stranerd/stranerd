import { ssrRef, watch, computed, useContext, useFetch } from '@nuxtjs/composition-api'
import {
	AddQuestion, FindQuestion, GetQuestions, ListenToQuestion,
	ListenToQuestions, QuestionEntity, QuestionFactory
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { CREDITS_GAP, MAXIMUM_CREDITS, MINIMUM_CREDITS, PAGINATION_LIMIT } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'
import { useCreateModal } from '@app/hooks/core/modals'

const global = {
	questions: ssrRef([] as QuestionEntity[]),
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
	const subjectId = ssrRef('')
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
	const answered = ssrRef(answeredChoices[0].val)
	const fetchQuestions = async () => {
		global.setError('')
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
			if (subjectId.value && q.subjectId !== subjectId.value) matched = false
			if (answered.value === Answered.Answered && !q.isAnswered) matched = false
			if (answered.value === Answered.Unanswered && q.isAnswered) matched = false
			return matched
		}).sort((a, b) => {
			return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
		}), set: (questions: QuestionEntity[]) => {
			questions.forEach(unshiftToQuestionList)
		}
	})

	if (!global.fetched.value) useFetch(fetchQuestions)

	return {
		...global, listener,
		filteredQuestions, subjectId, answeredChoices, answered,
		fetchOlderQuestions: fetchQuestions
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
			const maximum = user.value!.account.credits <= MAXIMUM_CREDITS ? user.value!.account.credits : MAXIMUM_CREDITS
			for (let i = MINIMUM_CREDITS; i <= maximum; i = i + CREDITS_GAP) credits.push(i)
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

export const useQuestion = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const question = computed({
		get: () => global.questions.value.find((q) => q.id === questionId) ?? null,
		set: (q) => {
			if (q) pushToQuestionList(q)
		}
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
