import { Ref, reqRef, useFetch, watch } from '@nuxtjs/composition-api'
import {
	AddAnswer,
	AnswerEntity,
	AnswerFactory,
	GetAnswers,
	LikeAnswer,
	ListenToAnswers,
	QuestionEntity,
	RateAnswer
} from '@modules/questions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const global: { [questionId: string] : {
	answers: Ref<AnswerEntity[]>,
	listener: Ref<(() => void) | null>,
	fetched: Ref<boolean>
}} = {}

export const useAnswerList = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (global[questionId] === undefined) global[questionId] = {
		answers: reqRef([]),
		listener: reqRef(null),
		fetched: reqRef(false)
	}

	const fetchAnswers = async () => {
		setError('')
		try {
			setLoading(true)
			global[questionId].answers.value = await GetAnswers.call(questionId)
			global[questionId].fetched.value = true
		} catch (error) { setError(error) }
		setLoading(false)
	}

	const startListener = async () => {
		setError('')
		try {
			setLoading(true)
			const callback = (answers: AnswerEntity[]) => global[questionId].answers.value = answers
			global[questionId].listener.value = await ListenToAnswers.call(questionId, callback)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	if (!global[questionId].fetched.value) useFetch(fetchAnswers)

	return {
		error, loading,
		answers: global[questionId].answers,
		startListener,
		closeListener: () => global[questionId].listener.value?.()
	}
}

export const createAnswer = (question: QuestionEntity) => {
	const { id, bio } = useAuth()
	const factory = reqRef(new AnswerFactory())
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	factory.value.questionId = question.id
	factory.value.credits = Math.round(question.credits * 0.25)
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
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const likeAnswer = async () => {
		const userId = useAuth().id.value!
		setError('')
		try {
			setLoading(true)
			await LikeAnswer.call(answer.id, userId)
		} catch (error) { setError(error) }
		setLoading(false)
	}
	const rateAnswer = async (rating: number) => {
		const userId = useAuth().id.value!
		setError('')
		try {
			setLoading(true)
			await RateAnswer.call(answer.id, userId, rating)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return {
		loading, error,
		likeAnswer, rateAnswer
	}
}
