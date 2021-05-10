<template>
	<nav class="full-top-nav">
		<button class="navbar-toggler" type="button" @click="setMenuModalSidebar">
			<span class="fas fa-bars" />
		</button>
		<NuxtLink to="/">
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
	name: 'DefaultTopNavigation',
	components: { Links },
	setup () {
		const { setMenuModalSidebar } = useMenuModal()
		return { setMenuModalSidebar }
	}
})
</script>
