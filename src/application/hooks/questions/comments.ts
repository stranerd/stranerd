import { Ref, reqRef } from '@nuxtjs/composition-api'
import { CommentEntity } from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

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
			// const callback = (comments: CommentEntity[]) => questionsGlobal[questionId].comments.value = comments
			// questionsGlobal[questionId].listener.value = await ListenToComments.call(questionId, callback)
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
