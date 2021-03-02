<template>
	<div class="d-inline-flex">
		<i class="fas fa-star" :class="rating > 0 ? 'text-gold' : 'text-grey'" />
		<i class="fas fa-star" :class="rating > 1 ? 'text-gold' : 'text-grey'" />
		<i class="fas fa-star" :class="rating > 2 ? 'text-gold' : 'text-grey'" />
		<i class="fas fa-star" :class="rating > 3 ? 'text-gold' : 'text-grey'" />
		<i class="fa fa-star" :class="rating > 4 ? 'text-gold' : 'text-grey'" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	props: {
		rating: {
			type: Number,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
i { margin: 0 0; }
</style>
