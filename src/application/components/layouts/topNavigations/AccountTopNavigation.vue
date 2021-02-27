<template>
	<nav class="top-nav">
		<button class="navbar-toggler" type="button" @click="setMenuModalAccountSidebar">
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
