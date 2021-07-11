<template>
	<section />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'User404Page',
	middleware: [
		({ redirect, route }) => redirect(`/users/${route.params.userId}/`)
	]
})
</script>
