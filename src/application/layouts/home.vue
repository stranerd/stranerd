<template>
	<div class="layout-page">
		<HomeTopNavigation />
		<section class="layout-body">
			<main class="layout-main p-0">
				<Nuxt />
				<HomeBottomNavigation />
			</main>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HomeTopNavigation from '@app/components/layouts/topNavigations/HomeTopNavigation.vue'
import HomeBottomNavigation from '@app/components/layouts/bottomNavigations/HomeBottomNavigation.vue'
export default defineComponent({
	name: 'HomeLayout',
	components: {
		HomeTopNavigation,
		HomeBottomNavigation
	},
	middleware: 'isNotAuthenticated'
})
</script>
