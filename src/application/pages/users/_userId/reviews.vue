<template>
	<ReviewsList :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import ReviewsList from '@app/components/users/reviews/ReviewsList.vue'
export default defineComponent({
	name: 'UserReviewsPage',
	components: { ReviewsList },
	layout: 'profile',
	setup () {
		const { userId } = useRoute().value.params
		return { userId }
	}
})
</script>
