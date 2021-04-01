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
export default defineComponent({
	name: 'DefaultLayout',
	components: {
		DefaultTopNavigation
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
