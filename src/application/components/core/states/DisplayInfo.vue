<template>
	<div v-if="message" class="small alert alert-info mx-auto my-1 text-center" role="alert">
		<span>{{ message }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'DisplayInfo',
	props: {
		message: {
			type: String,
			required: true
		}
	}
})
</script>
