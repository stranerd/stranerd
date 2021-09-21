<template>
	<div class="layout-page bg-dark">
		<TopNavigation :show-left-menu="true" :show-right-menu="true" />
		<section class="layout-body p-0 mb-4">
			<main class="layout-main p-0">
				<Nuxt />
			</main>
		</section>
		<MobileBottomNavigation />
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import MobileBottomNavigation from '@app/components/layouts/bottomNavigations/MobileBottomNavigation.vue'

export default defineComponent({
	name: 'ChatLayout',
	components: { TopNavigation, MobileBottomNavigation }
})
</script>
