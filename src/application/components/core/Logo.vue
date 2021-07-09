<template>
	<div>
		<img v-if="secondary" src="/images/logo-blue.svg" height="30" alt="Stranerd">
		<img v-else src="/images/logo-white.svg" height="30" alt="Stranerd">
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
