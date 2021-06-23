<template>
	<div>
		<img v-if="secondary" src="@/assets/images/homepage/logo.svg" height="30" alt="Stranerd">
		<img v-else src="/images/stranerd_logo.svg" height="30" alt="Stranerd">
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
