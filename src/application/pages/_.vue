<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Root404Page',
	middleware: [
		({ redirect }) => redirect('/')
	]
})
</script>
