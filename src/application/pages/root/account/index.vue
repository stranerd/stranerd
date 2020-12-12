<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'
export default defineComponent({
	name: 'AccountIndexPage',
	middleware: [
		({ redirect }) => redirect(GenerateLink({ path: '/account/questions' }))
	]
})
</script>
