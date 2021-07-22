import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetReviews, ReviewEntity } from '@modules/users'
import { PAGINATION_LIMIT } from '@utils/constants'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	reviews: Ref<ReviewEntity[]>,
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToReviewList = (id: string, review: ReviewEntity) => {
	const index = global[id].reviews.value.findIndex((a) => a.id === review.id)
	if (index !== -1) global[id].reviews.value.splice(index, 1, review)
	else global[id].reviews.value.push(review)
}

export const useUserReviewList = (id: string) => {
	if (!global[id]) global[id] = {
		reviews: ssrRef([]),
		fetched: ssrRef(false),
		hasMore: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchReviews = async () => {
		global[id].setError('')
		if (!id) return
		try {
			global[id].setLoading(true)
			const lastDate = global[id].reviews.value[global[id].reviews.value.length - 1]?.createdAt
			const reviews = await GetReviews.call(id, lastDate)
			global[id].hasMore.value = reviews.length === PAGINATION_LIMIT + 1
			reviews.slice(0, PAGINATION_LIMIT).forEach((a) => pushToReviewList(id, a))
			global[id].fetched.value = true
		} catch (error) { global[id].setError(error) }
		global[id].setLoading(false)
	}

	useFetch(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchReviews()
	})

	return { ...global[id], fetchOlderReviews: fetchReviews }
}
