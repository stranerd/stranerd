<template>
	<div v-if="message" class="small alert alert-success mx-auto my-0-5 text-center" role="alert">
		<span>{{ message }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'DisplaySuccess',
	props: {
		message: {
			type: String,
			required: true
		}
	}
})
</script>
