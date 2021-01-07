<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: '404Page',
	middleware: [
		({ redirect }) => redirect('/')
	]
})
</script>
