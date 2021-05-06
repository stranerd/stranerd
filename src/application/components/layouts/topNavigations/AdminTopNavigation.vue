<template>
	<nav class="top-nav">
		<button class="navbar-toggler" type="button" @click="setMenuModalAdminSidebar">
			<span class="fas fa-bars" />
		</button>
		<NuxtLink to="/admin/" class="d-lg-none">
			<Logo />
		</NuxtLink>
		<Links class="ms-auto" />
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
