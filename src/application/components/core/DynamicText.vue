<template>
	<span class="d-inline-block text-break text-wrap" :class="{'text-truncate': truncate}">
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
		}
	}
})
</script>
