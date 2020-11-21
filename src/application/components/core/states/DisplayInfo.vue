<template>
	<div v-if="message" class="alert alert-info mx-auto my-1" role="alert">
		<span>{{ message }}</span>
	</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	props: {
		message: {
			type: String,
			required: true
		}
	}
})
</script>
