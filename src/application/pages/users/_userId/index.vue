<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'UserSingleIndexPage',
	middleware: [
		({ redirect, route }) => redirect(`/users/${route.params.userId}/questions`)
	]
})
</script>
