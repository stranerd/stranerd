<template>
	<div v-if="error" class="small alert alert-danger w-100 my-0-25 text-center" role="alert">
		<span>{{ error }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'DisplayError',
	props: {
		error: {
			type: String,
			required: true
		}
	}
})
</script>
