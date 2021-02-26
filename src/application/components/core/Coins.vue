<template>
	<img v-if="gold" src="@/assets/images/icons/gold.svg" alt="" :width="size" :height="size">
	<img v-else src="@/assets/images/icons/bronze.svg" alt="" :width="size" :height="size">
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Coins',
	props: {
		size: {
			type: Number,
			required: false,
			default: 16
		},
		gold: {
			type: Boolean,
			required: false,
			default: false
		}
	}
})
</script>
