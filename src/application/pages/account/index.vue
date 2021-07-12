<template>
	<div />
</template>

<script lang="ts">
import { useAuth } from '@app/hooks/auth/auth'
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'AccountIndexPage',
	middleware: [
		'isAuthenticated',
		({ redirect }) => redirect(`/users/${useAuth().id.value}/`)
	]
})
</script>
