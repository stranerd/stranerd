<template>
	<div class="d-flex flex-column justify-content-center">
		<div class="text-center">
			<h1 class="display-4 my-4">
				application root
			</h1>
			<div class="text-center">
				<NuxtLink to="/dashboard">
					To Dashboard
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'IndexPage',
	layout: 'home',
	middleware: 'isNotAuthenticated'
})
</script>
