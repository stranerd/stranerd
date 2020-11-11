import { Ref, reqRef, watch } from '@nuxtjs/composition-api'
import {
	AddQuestionComment, CommentEntity, CommentFactory, ListenToQuestionComments
} from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const questionsGlobal: { [questionId: string] : {
	comments: Ref<CommentEntity[]>,
	listener: Ref<(() => void) | null>
}} = {}

export const useQuestionCommentList = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (questionsGlobal[questionId] === undefined) questionsGlobal[questionId] = {
		comments: reqRef([]),
		listener: reqRef(null)
	}

	const startListener = async () => {
		setError('')
		try {
			setLoading(true)
			const callback = (comments: CommentEntity[]) => questionsGlobal[questionId].comments.value = comments
			questionsGlobal[questionId].listener.value = await ListenToQuestionComments.call(questionId, callback)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return {
		error, loading,
		comments: questionsGlobal[questionId].comments,
		startListener,
		closeListener: () => questionsGlobal[questionId].listener.value?.()
	}
}

export const createQuestionComments = (questionId: string) => {
	const { id, bio } = useAuth()
	const factory = reqRef(new CommentFactory())
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
