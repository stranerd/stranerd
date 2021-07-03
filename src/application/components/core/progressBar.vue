<template>
	<div class="progress">
		<div
			class="progress-bar bg-success"
			role="progressbar"
			style="width: 25%"
			aria-valuenow="25"
			aria-valuemin="0"
			aria-valuemax="100"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Logo',
	props: {
		secondary: {
			type: Boolean,
			default: false,
			required: false
		}
	}
})
</script>
