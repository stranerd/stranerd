<template>
	<div class="d-inline-flex justify-content-center">
		<a @click.prevent="setRating(1)">
			<i class="fas fa-star" :class="rating > 0 ? 'text-gold' : 'text-grey'" />
		</a>
		<a @click.prevent="setRating(2)">
			<i class="fas fa-star" :class="rating > 1 ? 'text-gold' : 'text-grey'" />
		</a>
		<a @click.prevent="setRating(3)">
			<i class="fas fa-star" :class="rating > 2 ? 'text-gold' : 'text-grey'" />
		</a>
		<a @click.prevent="setRating(4)">
			<i class="fas fa-star" :class="rating > 3 ? 'text-gold' : 'text-grey'" />
		</a>
		<a @click.prevent="setRating(5)">
			<i class="fas fa-star" :class="rating > 4 ? 'text-gold' : 'text-grey'" />
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'SelectRating',
	props: {
		rating: {
			type: Number,
			required: true
		},
		setRating: {
			type: Function as PropType<(val: number) => void>,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
a { margin: 0 0.2rem; }
</style>
