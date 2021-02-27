<template>
	<nav class="d-flex align-items-center">
		<button class="navbar-toggler text-white rounded-0 mr-1 d-lg-none" type="button" @click="setMenuModalAccountSidebar">
			<span class="fas fa-bars" />
		</button>
		<NuxtLink to="/" class="d-lg-none">
			<Logo />
		</NuxtLink>
		<Links class="ml-auto" />
	</nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import Links from '@app/components/layouts/topNavigations/Links.vue'
export default defineComponent({
	name: 'AccountTopNavigation',
	components: { Links },
	setup () {
		const { setMenuModalAccountSidebar } = useMenuModal()
		return { setMenuModalAccountSidebar }
	}
})
</script>

<style lang="scss" scoped>
nav {
	background: $color-blue;
	color: $color-white;
	padding: 0.5rem 0.75rem;
	@media (min-width: $lg) {
		margin: 0 0 0.5rem;
		background: $color-white;
		$color: $color-blue-grey;
		border-radius: 1rem;
	}
}
</style>
