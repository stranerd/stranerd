import { Ref, ref, ssrRef, useFetch, watch } from '@nuxtjs/composition-api'
import {
	AddAnswer, AnswerEntity, AnswerFactory, GetAnswers,
	ListenToAnswers, MarkAsBestAnswer, QuestionEntity, RateAnswer
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'
import { useCreateModal } from '@app/hooks/core/modals'
import { Alert } from '@app/hooks/core/notifications'
import { analytics } from '@modules/core/services/initFirebase'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useAnswerList = (questionId: string) => {
	if (global[questionId] === undefined) global[questionId] = {
		answers: ssrRef([]),
		fetched: ssrRef(false),
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
		if (!global[questionId].fetched.value && !global[questionId].loading.value) await fetchAnswers()
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
	const factory = ref(new AnswerFactory()) as Ref<AnswerFactory>
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
				analytics.logEvent('answer_question_completed', {
					questionId: answeringQuestion?.id,
					subject: answeringQuestion?.subjectId
				})
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, answeringQuestion,
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
