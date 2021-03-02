import { Ref, reqSsrRef, useFetch, watch } from '@nuxtjs/composition-api'
import {
	AddAnswer, AnswerEntity, AnswerFactory, FindAnswer, GetAnswers, ListenToAnswer,
	ListenToAnswers, MarkAsBestAnswer, QuestionEntity, RateAnswer
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'
import { useCreateModal } from '@app/hooks/core/modals'
import { Alert } from '@app/hooks/core/notifications'

const global: { [questionId: string] : {
	answers: Ref<AnswerEntity[]>,
	fetched: Ref<boolean>,
	error: Ref<string>, setError: (error: any) => void,
	loading: Ref<boolean>, setLoading: (loading: boolean) => void
}} = {}

export const useAnswerList = (questionId: string) => {
	if (global[questionId] === undefined) global[questionId] = {
		answers: reqSsrRef([]),
		fetched: reqSsrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAnswers = async () => {
		global[questionId].setError('')
		try {
			global[questionId].setLoading(true)
			global[questionId].answers.value = await GetAnswers.call(questionId)
			global[questionId].fetched.value = true
		} catch (error) { global[questionId].setError(error) }
		global[questionId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (answers: AnswerEntity[]) => global[questionId].answers.value = answers
		return await ListenToAnswers.call(questionId, callback)
	})

	useFetch(async () => {
		if (!global[questionId].fetched.value) await fetchAnswers()
	})

	return {
		error: global[questionId].error,
		loading: global[questionId].loading,
		answers: global[questionId].answers,
		listener
	}
}

let answeringQuestion = null as QuestionEntity | null
export const openAnswerModal = (question: QuestionEntity) => {
	answeringQuestion = question
	useCreateModal().setCreateModalAnswer()
}

export const useCreateAnswer = () => {
	const { id, bio } = useAuth()
	const factory = reqSsrRef(new AnswerFactory()) as Ref<AnswerFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!answeringQuestion) useCreateModal().closeCreateModal()
	factory.value.questionId = answeringQuestion!.id
	factory.value.subjectId = answeringQuestion!.subjectId
	factory.value.coins = answeringQuestion!.creditable
	factory.value.userBioAndId = { id: id.value!, user: bio.value! }
	watch(() => id.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })
	watch(() => bio.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })

	const createAnswer = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddAnswer.call(factory.value)
				setMessage('Answer submitted successfully.')
				factory.value.reset()
				useCreateModal().closeCreateModal()
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading,
		createAnswer
	}
}

export const useAnswer = (answer: AnswerEntity) => {
	const { id } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const rateAnswer = async (rating: number) => {
		if (rating > 5 || rating < 0) return
		const userId = useAuth().id.value!
		if (!userId) return
		setError('')
		const accepted = await Alert({
			title: `Are you sure you want to rate this answer: ${rating} stars?`,
			text: 'This cannot be reversed',
			icon: 'info',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			try {
				setLoading(true)
				await RateAnswer.call(answer.id, userId, rating)
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	const markBestAnswer = async (question: QuestionEntity | null) => {
		if (!question || question.isAnswered) return
		if (question.userId !== id.value) return
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to mark this answer as the best',
			text: 'This cannot be reversed',
			icon: 'info',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			try {
				setLoading(true)
				await MarkAsBestAnswer.call(question.id, answer.id)
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return {
		loading, error, rateAnswer, markBestAnswer
	}
}

export const useAnswerById = (questionId: string, id: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const answer = reqSsrRef(null as AnswerEntity | null)

	const setAnswer = (answer: AnswerEntity) => {
		if (global[questionId] === undefined) global[questionId] = {
			answers: reqSsrRef([]),
			fetched: reqSsrRef(false),
			...useErrorHandler(),
			...useLoadingHandler()
		}
		const index = global[questionId].answers.value.findIndex((a) => a.id === answer.id)
		if (index > -1) global[questionId].answers.value.splice(index, 1, answer)
		else global[questionId].answers.value.push(answer)
	}
	const fetchAnswer = async () => {
		setError('')
		try {
			setLoading(true)
			const a = global[questionId]?.answers.value.find((a) => a.id === id) ?? null
			if (a) {
				answer.value = a
				setAnswer(a)
				setLoading(false)
				return
			}
			answer.value = await FindAnswer.call(id)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	useFetch(fetchAnswer)

	const listener = useListener(async () => {
		const cb = (a: AnswerEntity | null) => {
			if (a) {
				answer.value = a
				setAnswer(a)
			}
		}
		return await ListenToAnswer.call(id, cb)
	})

	return { loading, error, answer, listener }
}
