<template>
	<section />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'ReportsIndexPage',
	middleware: [
		({ redirect }) => redirect('/admin/reports/questions')
	]
})
</script>
