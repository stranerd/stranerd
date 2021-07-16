<template>
	<section class="layout-page">
		<TopNavigation />
		<AdminTopNavigation />
		<section class="layout-body">
			<main class="layout-main">
				<Nuxt />
			</main>
			<ModalBase />
		</section>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import AdminTopNavigation from '@app/components/layouts/topNavigations/AdminTopNavigation.vue'
export default defineComponent({
	name: 'AdminLayout',
	components: { TopNavigation, AdminTopNavigation },
	middleware: ['isAdmin']
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
