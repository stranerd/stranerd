<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Account404Page',
	middleware: [
		({ redirect }) => redirect('/account/')
	]
})
</script>
