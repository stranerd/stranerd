<template>
	<nav class="d-flex align-items-center">
		<button class="navbar-toggler text-white rounded-0 mr-1 d-lg-none" type="button" @click="setMenuModalAdminSidebar">
			<span class="fas fa-bars" />
		</button>
		<NuxtLink to="/admin/">
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
	name: 'AdminTopNavigation',
	components: { Links },
	setup () {
		const { setMenuModalAdminSidebar } = useMenuModal()
		return { setMenuModalAdminSidebar }
	}
})
</script>

<style lang="scss" scoped>
nav {
	background: $color-blue;
	color: $color-white;
	padding: 0.5rem 0.75rem;
}
</style>
