<template>
	<img src="@/assets/images/icons/bronze-coin.svg" alt="" :width="size" :height="size">
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
