<template>
	<div v-if="error" class="alert alert-danger mx-auto my-1 text-center" role="alert">
		<span>{{ error }}</span>
	</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	props: {
		error: {
			type: String,
			required: true
		}
	}
})
</script>
