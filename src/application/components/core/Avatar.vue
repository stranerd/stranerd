<template>
	<img
		:src="src"
		alt=""
		:style="`width: ${size}px;height: ${size}px; border-radius: 10rem; border: 1.5px solid transparent;`"
	>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Avatar',
	props: {
		src: {
			required: true,
			type: String
		},
		size: {
			required: false,
			type: Number,
			default: 40
		}
	}
})
</script>
