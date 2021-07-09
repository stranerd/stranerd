<template>
	<section class="layout-body bg-white">
		<main class="col-12">
			<HomeTopNavigation class="w-100 fixed-top" />
			<div style="height: 60px;" />
			<Nuxt />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HomeTopNavigation from '@app/components/layouts/topNavigations/HomeTopNavigation.vue'
export default defineComponent({
	name: 'AuthLayout',
	components: {
		HomeTopNavigation
	}
})
</script>

<style lang="scss" scoped>
	.body {
		min-height: vh(100);
		padding: 0.25rem;
	}

	.content {
		width: 100%;
		max-width: 720px;
		background: $color-white;
		border-radius: 0.75rem;
	}

	@media (min-width: $md) {
		.body { padding: 4rem; }

		.content {
			padding-left: 7rem;
			padding-right: 7rem;
		}
	}
</style>
