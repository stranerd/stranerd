import { Ref, reqRef, watch } from '@nuxtjs/composition-api'
import {
	AddAnswerComment, CommentEntity, CommentFactory, ListenToAnswerComments
} from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const answersGlobal: { [answerId: string] : {
	comments: Ref<CommentEntity[]>,
	listener: Ref<(() => void) | null>
}} = {}

export const useAnswerCommentList = (answerId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (answersGlobal[answerId] === undefined) answersGlobal[answerId] = {
		comments: reqRef([]),
		listener: reqRef(null)
	}

	const startListener = async () => {
		setError('')
		try {
			setLoading(true)
			const callback = (comments: CommentEntity[]) => answersGlobal[answerId].comments.value = comments
			answersGlobal[answerId].listener.value = await ListenToAnswerComments.call(answerId, callback)
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return {
		error, loading,
		comments: answersGlobal[answerId].comments,
		startListener,
		closeListener: () => answersGlobal[answerId].listener.value?.()
	}
}

export const createAnswerComments = (answerId: string) => {
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
				await AddAnswerComment.call(answerId, factory.value)
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
