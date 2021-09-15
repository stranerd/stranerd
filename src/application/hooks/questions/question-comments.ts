import { Ref, ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import {
	AddQuestionComment,
	CommentEntity,
	CommentFactory,
	GetQuestionComments,
	ListenToQuestionComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	comments: Ref<CommentEntity[]>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useQuestionCommentList = (questionId: string) => {
	if (global[questionId] === undefined) global[questionId] = {
		comments: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		global[questionId].setError('')
		try {
			global[questionId].setLoading(true)
			global[questionId].comments.value = (await GetQuestionComments.call(questionId)).results
			global[questionId].fetched.value = true
		} catch (error) {
			global[questionId].setError(error)
		}
		global[questionId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (comments: CommentEntity[]) => global[questionId].comments.value = comments
		return await ListenToQuestionComments.call(questionId, callback)
	})

	useFetch(async () => {
		if (!global[questionId].fetched.value && !global[questionId].loading.value) await fetchComments()
	})

	return {
		error: global[questionId].error,
		loading: global[questionId].loading,
		comments: global[questionId].comments,
		listener
	}
}

export const useCreateQuestionComments = (questionId: string) => {
	const factory = ref(new CommentFactory()) as Ref<CommentFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const createComment = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddQuestionComment.call(questionId, factory.value)
				factory.value.reset()
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading,
		createComment
	}
}
