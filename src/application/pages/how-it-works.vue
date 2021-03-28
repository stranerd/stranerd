<template>
	<div class="d-flex flex-column justify-content-center">
		<div class="text-center">
			<h1 class="display-4 my-4">
				How it works
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
	name: 'HowItWorksPage',
	layout: 'home'
})
</script>
