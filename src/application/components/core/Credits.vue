<template>
	<img src="@/assets/images/icons/credits.svg" alt="" :width="size" :height="size">
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Credits',
	props: {
		size: {
			type: Number,
			required: false,
			default: 16
		}
	}
})
</script>
