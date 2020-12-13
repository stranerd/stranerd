<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Admin404Page',
	middleware: [
		({ redirect }) => redirect('/admin/')
	]
})
</script>
