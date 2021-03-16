<template>
	<div class="page-content">
		<h1>Messages</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'MessagesPage',
	middleware: ['isAuthenticated']
})
</script>
