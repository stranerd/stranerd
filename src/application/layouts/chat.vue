<template>
	<div>
		<TopNavigation :open-menu="openSidebar" />
		<section class="layout-body bg-main">
			<main class="layout-main">
				<Nuxt class="justify-content-center align-items-center" />
			</main>
			<ModalBase />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'DefaultLayout',
	components: { TopNavigation },
	setup () {
		const { openSidebar } = useMenuModal()
		return { openSidebar }
	}
})
</script>

<style lang="scss" scoped>
	.layout-body {
		margin-left: auto;
		margin-right: auto;
	}

	.layout-main {
		@media (min-width: $lg) { width: 100%; }
	}
</style>
