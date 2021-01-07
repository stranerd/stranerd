<template>
	<div>
		<DefaultTopNavigation class="shadowed" />
		<div class="content px-1">
			<Nuxt />
		</div>
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultTopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import ModalBase from '@app/components/modals/Base.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'UsersLayout',
	components: {
		DefaultTopNavigation,
		ModalBase
	},
	middleware: [
		(ctx) => {
			const { isLoggedIn, id } = useAuth()
			const path = ctx.route.fullPath
			const { userId } = ctx.route.params
			if (!userId || !isLoggedIn.value) return
			if (userId === id.value) return ctx.redirect(
				path.replace(`users/${userId}`, 'account')
			)
		}
	]
})
</script>

<style lang="scss" scoped>
.shadowed {
	box-shadow: 0 3px 10px rgba($color-black, 0.1);
}
.content {
	margin: 0 auto;
	max-width: $lg;
}
</style>
