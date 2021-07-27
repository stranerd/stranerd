<template>
	<div class="layout-page overflow-x-hidden">
		<HomeTopNavigation class="fixed-top" />
		<div style="height: 66px;" />
		<section class="layout-body">
			<main class="layout-main p-0">
				<Nuxt />
				<HomeBottomNavigation />
			</main>
		</section>
		<ModalBase />
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
