<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'
export default defineComponent({
	middleware: [
		'isNotAuthenticated',
		({ redirect }) => redirect(GenerateLink({ path: '/auth/signin' }))
	]
})
</script>
