<template>
	<div class="layout-page bg-dark">
		<TopNavigation />
		<section class="layout-body gap-3">
			<main class="layout-main p-0">
				<Nuxt />
			</main>
		</section>
		<ModalBase />
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

<style lang="scss" scoped>
	.layout-page {
		height: vh(100);
		overflow-y: hidden;
	}
</style>
