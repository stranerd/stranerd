<template>
	<div class="layout-page">
		<TopNavigation :open-menu="openSidebar" />
		<section class="layout-body">
			<main class="layout-main">
				<Nuxt />
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
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
