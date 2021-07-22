<template>
	<div class="layout-page bg-dark">
		<TopNavigation />
		<section class="layout-body">
			<main class="layout-main p-0">
				<Nuxt />
			</main>
			<ModalBase />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
export default defineComponent({
	name: 'ChatLayout',
	components: { TopNavigation }
})
</script>
