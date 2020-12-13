<template>
	<nuxt-link :to="to">
		<slot />
	</nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'BaseLink',
	props: {
		to: {
			required: true,
			type: String
		}
	}
})
</script>
