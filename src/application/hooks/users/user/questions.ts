import { computed, Ref, reqRef, useFetch } from '@nuxtjs/composition-api'
import { GetUserQuestions, QuestionEntity } from '@modules/questions'
import { PAGINATION_LIMIT } from '@utils/constants'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

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

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>,
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>,
	subjectId: Ref<string>,
	answered: Ref<Answered>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToQuestionList = (id: string, question: QuestionEntity) => {
	const index = global[id].questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global[id].questions.value.splice(index, 1, question)
	else global[id].questions.value.push(question)
}

export const useUserQuestionList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		questions: reqRef([]),
		subjectId: reqRef(''),
		fetched: reqRef(false),
		hasMore: reqRef(false),
		answered: reqRef(answeredChoices[0].val),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const filteredQuestions = computed({
		get: () => global[id].questions.value.filter((q) => {
			let matched = true
			if (global[id].subjectId.value && q.subjectId !== global[id].subjectId.value) matched = false
			if (global[id].answered.value === Answered.Answered && !q.isAnswered) matched = false
			if (global[id].answered.value === Answered.Unanswered && q.isAnswered) matched = false
			return matched
		}).sort((a, b) => {
			return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
		}), set: (questions) => { questions.map((q) => pushToQuestionList(id, q)) }
	})

	const fetchQuestions = async () => {
		global[id].setError('')
		try {
			global[id].setLoading(true)
			const lastDate = global[id].questions.value[global[id].questions.value.length - 1]?.createdAt
			const questions = await GetUserQuestions.call(id, lastDate ? new Date(lastDate) : undefined)
			global[id].hasMore.value = questions.length === PAGINATION_LIMIT + 1
			questions.slice(0, PAGINATION_LIMIT).forEach((q) => pushToQuestionList(id, q))
			global[id].fetched.value = true
		} catch (error) { global[id].setError(error) }
		global[id].setLoading(false)
	}

	useFetch(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchQuestions()
	})

	return { ...global[id], filteredQuestions, answeredChoices, fetchOlderQuestions: fetchQuestions }
}
