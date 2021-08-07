<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'QuestionsPage',
	middleware: [
		({ redirect }) => redirect('/dashboard')
	]
})
</script>
