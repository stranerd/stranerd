<template>
	<div>
		<div class="mb-1">
			<ReviewCard />
		</div>
		<div class="mb-1">
			<ReviewCard />
		</div>
		<div class="mb-1">
			<ReviewCard />
		</div>
		<div class="mb-1">
			<ReviewCard />
		</div>
		<div class="mb-1">
			<ReviewCard />
		</div>
		<div v-if="hasMore" class="text-center py-0-5 text-18">
			<a class="fw-bold" @click.prevent="fetchOlderQuestions">LOAD MORE</a>
		</div>
		<!-- <DisplayWarning v-if="!loading && !error && questions.length === 0" message="This user has not asked any questions yet." /> -->
		<!-- <DisplayError :error="error" /> -->
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ReviewCard from '@app/components/users/reviews/UserReviewListCard.vue'
export default defineComponent({
	name: 'ReviewList',
	components: { ReviewCard }
})
</script>
<style lang="scss" scoped>
.btn-custom-outlined {
	 background-color: $color-tags;
		border-radius: 6px;
		border: 1px solid $color-line;
		font-size: 15px;
		color: $color-text-sub;
		width: 100%;
		font-weight: bold;
	}
</style>
