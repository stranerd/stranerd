<template>
	<div class="page-content">
		<h1>Single Message</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'MessagePage',
	middleware: ['isAuthenticated']
})
</script>
