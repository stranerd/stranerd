<template>
	<div class="layout-page">
		<TopNavigation />
		<section class="layout-body gap-3">
			<main class="layout-main">
				<Nuxt />
			</main>
			<section class="layout-side-right ms-2">
				<RightSidebar />
			</section>
		</section>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
export default defineComponent({
	name: 'JustifiedLayout',
	components: { TopNavigation, RightSidebar }
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1440px;
	}
</style>
