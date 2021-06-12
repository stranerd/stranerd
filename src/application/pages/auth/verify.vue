<template>
	<h1>Verify email</h1>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'AuthVerifyPage',
	layout: 'auth',
	middleware: ['isAuthenticated']
})
</script>
