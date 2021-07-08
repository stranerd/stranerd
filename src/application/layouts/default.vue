<template>
	<div>
		<TopNavigation :open-menu="openSidebar" />
		<section class="layout-body mb-0">
			<main class="layout-main flex-grow-0 ">
				<Nuxt class="ranking-layout-content" />
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
	name: 'JustifiedLayout',
	components: { TopNavigation },
	setup () {
		const { openSidebar } = useMenuModal()
		return { openSidebar }
	}
})
</script>
