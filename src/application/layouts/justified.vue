<template>
	<div class="layout-page">
		<TopNavigation :open-menu="openSidebar" />
		<section class="layout-body">
			<main class="layout-main">
				<Nuxt />
			</main>
			<section class="layout-side-right ms-2">
				<RightSidebar />
			</section>
			<ModalBase />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'JustifiedLayout',
	components: { TopNavigation, RightSidebar },
	setup () {
		const { openSidebar } = useMenuModal()
		return { openSidebar }
	}
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1440px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
