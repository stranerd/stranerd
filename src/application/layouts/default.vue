<template>
	<section class="layout-body">
		<main class="layout-main">
			<TopNavigation :full="true" :open-menu="setMenuModalSidebar" />
			<div class="content">
				<Nuxt class="layout-content" />
			</div>
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/TopNavigation.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'DefaultLayout',
	components: {
		TopNavigation
	},
	setup () {
		const { setMenuModalSidebar } = useMenuModal()
		return { setMenuModalSidebar }
	}
})
</script>

<style lang="scss" scoped>
.content {
	margin: 0 auto;
	width: 100%;
	max-width: $lg;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
}
</style>
