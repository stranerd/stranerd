<template>
	<div>
		<ReviewCard v-for="review in reviews" :key="review.hash" :review="review" class="border-bottom border-line" />
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a @click.prevent="fetchOlderReviews">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && reviews.length === 0" message="This user has not received any reviews yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ReviewCard from '@app/components/users/reviews/ReviewListCard.vue'
import { useUserReviewList } from '@app/hooks/users/user/reviews'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'ReviewsList',
	components: { ReviewCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { reviews, error, loading, hasMore, fetchOlderReviews } = useUserReviewList(props.userId)
		return {
			id,
			reviews, error, loading, hasMore,
			fetchOlderReviews
		}
	}
})
</script>
