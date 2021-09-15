import { Ref, ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import {
	AddAnswerComment,
	CommentEntity,
	CommentFactory,
	GetAnswerComments,
	ListenToAnswerComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	comments: Ref<CommentEntity[]>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useAnswerCommentList = (answerId: string) => {
	if (global[answerId] === undefined) global[answerId] = {
		comments: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		global[answerId].setError('')
		try {
			global[answerId].setLoading(true)
			global[answerId].comments.value = (await GetAnswerComments.call(answerId)).results
			global[answerId].fetched.value = true
		} catch (error) {
			global[answerId].setError(error)
		}
		global[answerId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (comments: CommentEntity[]) => global[answerId].comments.value = comments
		return await ListenToAnswerComments.call(answerId, callback)
	})

	useFetch(async () => {
		if (!global[answerId].fetched.value && !global[answerId].loading.value) await fetchComments()
	})

	return {
		error: global[answerId].error,
		loading: global[answerId].loading,
		comments: global[answerId].comments,
		listener
	}
}

export const useCreateAnswerComments = (answerId: string) => {
	const factory = ref(new CommentFactory()) as Ref<CommentFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const createComment = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddAnswerComment.call(answerId, factory.value)
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
