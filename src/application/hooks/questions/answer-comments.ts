import { Ref, ref, reqSsrRef, useFetch, watch } from '@nuxtjs/composition-api'
import {
	AddAnswerComment, CommentEntity, CommentFactory, GetAnswerComments, ListenToAnswerComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const global: { [answerId: string] : {
	comments: Ref<CommentEntity[]>,
	fetched: Ref<boolean>,
	error: Ref<string>, setError: (error: any) => void,
	loading: Ref<boolean>, setLoading: (loading: boolean) => void
}} = {}

export const useAnswerCommentList = (answerId: string) => {
	if (global[answerId] === undefined) global[answerId] = {
		comments: reqSsrRef([]),
		fetched: reqSsrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		global[answerId].setError('')
		try {
			global[answerId].setLoading(true)
			global[answerId].comments.value = await GetAnswerComments.call(answerId)
			global[answerId].fetched.value = true
		} catch (error) { global[answerId].setError(error) }
		global[answerId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (comments: CommentEntity[]) => global[answerId].comments.value = comments
		return await ListenToAnswerComments.call(answerId, callback)
	})

	useFetch(async () => {
		if (!global[answerId].fetched.value) await fetchComments()
	})

	return {
		error: global[answerId].error,
		loading: global[answerId].loading,
		comments: global[answerId].comments,
		listener
	}
}

export const useCreateAnswerComments = (answerId: string) => {
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
