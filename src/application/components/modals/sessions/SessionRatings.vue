<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Rate Session
		</template>
		<p class="text-center my-0">
			Time to leave a rating for the session
		</p>
		<div class="text-center my-1">
			<SelectRating :rating="rating" :set-rating="(val) => rating = val" />
		</div>
		<div class="form-group my-1">
			<textarea v-model="review" rows="5" class="form-control" placeholder="Please leave a review ..." />
		</div>
		<div class="d-flex justify-content-end my-1">
			<button class="btn btn-blue" @click="rateSession">
				Submit
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script>
import { useRateSession } from '@app/hooks/sessions/sessions'
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'SessionRatings',
	setup () {
		const { loading, error, rating, review, rateSession } = useRateSession('')
		return { loading, error, rating, review, rateSession }
	}
})
</script>

<style lang="scss" scoped>
	/deep/ i {
		margin: 0 0.15rem;
		font-size: 3rem;
	}
</style>
