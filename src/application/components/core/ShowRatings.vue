<template>
	<div class="d-inline-flex text-no-wrap">
		<i class="fas" :class="{'fa-star text-gold': rating >= 0.5, 'fa-star-half-alt text-gold': rating > 0 && rating < 0.5, 'fa-star text-grey': rating <= 0 }" />
		<i class="fas" :class="{'fa-star text-gold': rating >= 1.5, 'fa-star-half-alt text-gold': rating > 1 && rating < 1.5, 'fa-star text-grey': rating <= 1 }" />
		<i class="fas" :class="{'fa-star text-gold': rating >= 2.5, 'fa-star-half-alt text-gold': rating > 2 && rating < 2.5, 'fa-star text-grey': rating <= 2 }" />
		<i class="fas" :class="{'fa-star text-gold': rating >= 3.5, 'fa-star-half-alt text-gold': rating > 3 && rating < 3.5, 'fa-star text-grey': rating <= 3 }" />
		<i class="fas" :class="{'fa-star text-gold': rating >= 4.5, 'fa-star-half-alt text-gold': rating > 4 && rating < 4.5, 'fa-star text-grey': rating <= 4 }" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'ShowRatings',
	props: {
		rating: {
			type: Number,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
i { font-size: 1.125rem; }
</style>
