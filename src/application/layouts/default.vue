<template>
	<section class="layout-body">
		<main class="layout-main">
			<DefaultTopNavigation />
			<div class="content">
				<Nuxt class="layout-content" />
			</div>
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultTopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'DefaultLayout',
	components: {
		DefaultTopNavigation,
		ModalBase
	}
})
</script>

<style lang="scss" scoped>
.content {
	margin: 0 auto;
	max-width: $lg;
}
</style>
