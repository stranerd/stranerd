<template>
	<section />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'UserIndexPage',
	middleware: [
		({ redirect, route }) => redirect(`/users/${route.params.userId}/questions`)
	]
})
</script>
