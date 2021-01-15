<template>
	<nav class="d-flex align-items-center">
		<button class="navbar-toggler rounded-0 mr-1 d-lg-none" type="button" @click="setMenuModalSidebar">
			<span class="fas fa-bars text-grey" />
		</button>
		<NuxtLink to="/account/">
			<img src="@/assets/images/stranerd_logo.png" alt="Stranerd" height="50">
		</NuxtLink>
		<Links class="ml-auto" />
	</nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import Links from '@app/components/layouts/topNavigations/Links.vue'
export default defineComponent({
	name: 'UserTopNavigation',
	components: { Links },
	setup () {
		const { setMenuModalSidebar } = useMenuModal()
		return { setMenuModalSidebar }
	}
})
</script>

<style lang="scss" scoped>
nav {
	background: $color-white;
	padding: 0.5rem 0.75rem;
}
</style>
