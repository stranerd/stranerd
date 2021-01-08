<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'QuestionSingle404Page',
	middleware: [
		({ redirect, route }) => redirect(`/questions/${route.params.questionId}/`)
	]
})
</script>
