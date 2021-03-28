<template>
	<section class="layout-body">
		<main class="layout-main">
			<div class="bg-blue d-flex flex-column" style="min-height: 98vh;">
				<HomeTopNavigation class="w-100" />
				<Nuxt class="flex-grow-1" />
			</div>
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
	}
})
</script>
