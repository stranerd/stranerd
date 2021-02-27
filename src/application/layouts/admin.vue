<template>
	<section class="body">
		<section class="side-left">
			<AdminSidebar />
		</section>
		<main class="main-view">
			<AdminTopNavigation />
			<Nuxt class="mx-half mx-lg-0" />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AdminTopNavigation from '@app/components/layouts/topNavigations/AdminTopNavigation.vue'
import AdminSidebar from '@app/components/layouts/sidebars/AdminSidebar.vue'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'AdminLayout',
	components: {
		AdminTopNavigation,
		AdminSidebar,
		ModalBase
	},
	middleware: ['isAdmin']
})
</script>

<style lang="scss" scoped>
.body {
	min-height: 100vh;
	margin: 0 auto;
	max-width: 2000px;
	display: flex;
	flex-direction: column;
	@media (min-width: $lg) {
		flex-direction: row;
	}
}
.side-left {
	display: none;
	background-color: $color-blue;
	padding: 0.5rem;
	@media (min-width: $lg) {
		width: 20%;
		max-width: 400px;
		display: block;
	}
	@media (min-width: 1050px) {
		padding: 1rem;
	}
}
.main-view {
	@media (min-width: $lg) {
		padding: 1rem;
		width: 55%;
		flex-grow: 1;
	}
}
</style>
