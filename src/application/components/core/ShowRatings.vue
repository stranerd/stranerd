<template>
	<div class="d-inline-block">
		<i class="fas mx-1 fa-star" :class="rating > 0 ? 'text-gold' : 'text-secondary'" />
		<i class="fas mx-1 fa-star" :class="rating > 1 ? 'text-gold' : 'text-secondary'" />
		<i class="fas mx-1 fa-star" :class="rating > 2 ? 'text-gold' : 'text-secondary'" />
		<i class="fas mx-1 fa-star" :class="rating > 3 ? 'text-gold' : 'text-secondary'" />
		<i class="fas mx-1 fa-star" :class="rating > 4 ? 'text-gold' : 'text-secondary'" />
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
