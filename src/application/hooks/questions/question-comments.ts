import { Ref, ref, ssrRef, useFetch, watch } from '@nuxtjs/composition-api'
import {
	AddQuestionComment, CommentEntity, CommentFactory, GetQuestionComments, ListenToQuestionComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'
import { isServer } from '@utils/environment'

const global: { [questionId: string] : {
	comments: Ref<CommentEntity[]>,
	fetched: Ref<boolean>,
	error: Ref<string>, setError: (error: any) => void,
	loading: Ref<boolean>, setLoading: (loading: boolean) => void
}} = {}

export const useQuestionCommentList = (questionId: string) => {
	if (global[questionId] === undefined) global[questionId] = {
		comments: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		global[questionId].setError('')
		if (isServer()) global[questionId].comments.value = []
		try {
			global[questionId].setLoading(true)
			global[questionId].comments.value = await GetQuestionComments.call(questionId)
			global[questionId].fetched.value = true
		} catch (error) { global[questionId].setError(error) }
		global[questionId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (comments: CommentEntity[]) => global[questionId].comments.value = comments
		return await ListenToQuestionComments.call(questionId, callback)
	})

	if (!global[questionId].fetched.value || isServer()) useFetch(fetchComments)

	return {
		error: global[questionId].error,
		loading: global[questionId].loading,
		comments: global[questionId].comments,
		listener
	}
}

export const useCreateQuestionComments = (questionId: string) => {
	const { id, bio } = useAuth()
	const factory = ref(new CommentFactory()) as Ref<CommentFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	factory.value.userBioAndId = { id: id.value!, user: bio.value! }
	watch(() => id.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })
	watch(() => bio.value, () => factory.value.userBioAndId = { id: id.value!, user: bio.value! })

	const createComment = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddQuestionComment.call(questionId, factory.value)
				factory.value.reset()
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading,
		createComment
	}
}
