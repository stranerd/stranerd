import { Ref, ssrRef, useFetch, watch } from '@nuxtjs/composition-api'
import {
	AddQuestionComment, CommentEntity, CommentFactory, GetQuestionComments, ListenToQuestionComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const questionsGlobal: { [questionId: string] : {
	comments: Ref<CommentEntity[]>,
	fetched: Ref<boolean>,
	error: Ref<string>, setError: (error: any) => void,
	loading: Ref<boolean>, setLoading: (loading: boolean) => void
}} = {}

export const useQuestionCommentList = (questionId: string) => {
	if (questionsGlobal[questionId] === undefined) questionsGlobal[questionId] = {
		comments: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		questionsGlobal[questionId].setError('')
		try {
			questionsGlobal[questionId].setLoading(true)
			questionsGlobal[questionId].comments.value = await GetQuestionComments.call(questionId)
			questionsGlobal[questionId].fetched.value = true
		} catch (error) { questionsGlobal[questionId].setError(error) }
		questionsGlobal[questionId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (comments: CommentEntity[]) => questionsGlobal[questionId].comments.value = comments
		return await ListenToQuestionComments.call(questionId, callback)
	})

	if (!questionsGlobal[questionId].fetched.value) useFetch(fetchComments)

	return {
		error: questionsGlobal[questionId].error,
		loading: questionsGlobal[questionId].loading,
		comments: questionsGlobal[questionId].comments,
		listener
	}
}

export const useCreateQuestionComments = (questionId: string) => {
	const { id, bio } = useAuth()
	const factory = ssrRef<CommentFactory>(new CommentFactory())
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
