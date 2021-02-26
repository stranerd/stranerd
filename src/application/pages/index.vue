<template>
	<div class="container min-vh-100 d-flex flex-column justify-content-center bg-blue">
		<div class="text-center">
			<Logo />
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
	middleware: 'isNotAuthenticated'
})
</script>
