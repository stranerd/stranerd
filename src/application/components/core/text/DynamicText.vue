<template>
	<span
		class="d-inline-block"
		:class="{
			'text-truncate': truncate,
			'text-nowrap': noWrap,
			'text-wrap text-break': !noWrap
		}"
	>
		<slot />
	</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'DynamicText',
	props: {
		truncate: {
			required: false,
			type: Boolean,
			default: false
		},
		noWrap: {
			required: false,
			type: Boolean,
			default: false
		}
	}
})
</script>
