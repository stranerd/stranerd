<template>
	<div class="layout-page bg-dark">
		<TopNavigation :show-left-menu="true" :show-right-menu="true" />
		<section class="layout-body p-0">
			<main class="layout-main p-0">
				<Nuxt />
			</main>
		</section>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'

export default defineComponent({
	name: 'ChatLayout',
	components: { TopNavigation }
})
</script>
