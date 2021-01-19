<template>
	<section>
		<UserTopNavigation class="shadowed" />
		<div class="body">
			<div class="p-1 d-none d-lg-block page-content mr-4 w-25">
				<UserSidebar />
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
import UserTopNavigation from '@app/components/layouts/topNavigations/UserTopNavigation.vue'
import UserSidebar from '@app/components/layouts/sidebars/UserSidebar.vue'
import ModalBase from '@app/components/modals/Base.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'UsersLayout',
	components: {
		UserTopNavigation,
		UserSidebar,
		ModalBase
	},
	middleware: [
		({ route, redirect }) => {
			const { isLoggedIn, id } = useAuth()
			const { userId } = route.params
			if (!userId || !isLoggedIn.value) return
			if (userId === id.value) return redirect(
				route.fullPath.replace(`users/${userId}`, 'account')
			)
		}
	]
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
