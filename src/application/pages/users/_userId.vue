<template>
	<div>
		<h1>{{ $route.params.userId }}</h1>
		<NuxtChild />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'UserSingleRootPage',
	layout: 'users'
})
</script>
