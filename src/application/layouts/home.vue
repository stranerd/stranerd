<template>
	<section class="layout-body bg-white">
		<main class="layout-main">
			<HomeTopNavigation class="w-100 fixed-top" />
			<div style="height: 60px" />
			<Nuxt class="flex-grow-1" />
			<HomeBottomNavigation />
		</main>
		<ModalBase />
	</section>
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
