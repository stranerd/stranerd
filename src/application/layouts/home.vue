<template>
	<section class="layout-body">
		<main class="layout-main">
			<div class="bg-blue d-flex flex-column" style="min-height: 98vh;">
				<HomeTopNavigation class="w-100" />
				<Nuxt class="flex-grow-1" />
				<div class="links">
					<NuxtLink to="/">
						<i class="fas fa-circle" />
					</NuxtLink>
					<NuxtLink to="/how-it-works">
						<i class="fas fa-circle" />
					</NuxtLink>
					<NuxtLink to="/contact-us">
						<i class="fas fa-circle" />
					</NuxtLink>
				</div>
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

<style lang="scss" scoped>
.links {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1rem 0;
	a {
		color: $color-light-blue;
		margin: 0 0.25rem;
		font-size: 0.5rem;
	}
	.nuxt-link-exact-active {
		border-radius: 1rem;
		border: 4px solid $color-light-blue;
		color: $color-blue;
	}
}
</style>
