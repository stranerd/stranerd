<template>
	<div class="layout-page">
		<TopNavigation />
		<section class="layout-body gap-3">
			<main class="layout-main">
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
	name: 'DefaultLayout',
	components: { TopNavigation }
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1200px;
	}
</style>
