import { reqRef, Ref, reqSsrRef, useFetch, watch } from '@nuxtjs/composition-api'
import {
	AddAnswerComment, CommentEntity, CommentFactory, GetAnswerComments, ListenToAnswerComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const answersGlobal: { [answerId: string] : {
	comments: Ref<CommentEntity[]>,
	fetched: Ref<boolean>,
	error: Ref<string>, setError: (error: any) => void,
	loading: Ref<boolean>, setLoading: (loading: boolean) => void
}} = {}

export const useAnswerCommentList = (answerId: string) => {
	if (answersGlobal[answerId] === undefined) answersGlobal[answerId] = {
		comments: reqSsrRef([]),
		fetched: reqSsrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		answersGlobal[answerId].setError('')
		try {
			answersGlobal[answerId].setLoading(true)
			answersGlobal[answerId].comments.value = await GetAnswerComments.call(answerId)
			answersGlobal[answerId].fetched.value = true
		} catch (error) { answersGlobal[answerId].setError(error) }
		answersGlobal[answerId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (comments: CommentEntity[]) => answersGlobal[answerId].comments.value = comments
		return await ListenToAnswerComments.call(answerId, callback)
	})

	if (!answersGlobal[answerId].fetched.value) useFetch(fetchComments)

	return {
		error: answersGlobal[answerId].error,
		loading: answersGlobal[answerId].loading,
		comments: answersGlobal[answerId].comments,
		listener
	}
}

export const useCreateAnswerComments = (answerId: string) => {
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
