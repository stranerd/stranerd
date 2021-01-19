<template>
	<section>
		<AccountTopNavigation class="shadowed px-lg-4" />
		<div class="body">
			<div class="p-1 d-none d-lg-block page-content mr-4 w-25">
				<AccountSidebar />
			</div>
			<div class="w-grow">
				<Nuxt />
			</div>
		</div>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AccountTopNavigation from '@app/components/layouts/topNavigations/AccountTopNavigation.vue'
import AccountSidebar from '@app/components/layouts/sidebars/AccountSidebar.vue'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'AccountLayout',
	components: {
		AccountTopNavigation,
		AccountSidebar,
		ModalBase
	},
	middleware: ['isAuthenticated']
})
</script>

<style lang="scss" scoped>
section {
  min-height: 100vh;
}
.shadowed {
	box-shadow: 0 3px 10px rgba($color-black, 0.1);
}
.body {
	margin: 0 auto;
	max-width: $xl;
	padding: 0 0.5rem;
	display: flex;
}
.w-grow {
	width: 100%;
	@media (min-width: $lg) { width: calc(75% - 2rem); }
}
</style>
