<template>
	<span class="d-inline-block text-break" :class="{'text-truncate': truncate}">
		{{ text }}
	</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'DynamicText',
	props: {
		text: {
			type: String,
			required: true
		},
		truncate: {
			required: false,
			type: Boolean,
			default: false
		}
	}
})
</script>
