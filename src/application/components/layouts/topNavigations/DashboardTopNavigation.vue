<template>
	<nav class="top-nav">
		<button class="navbar-toggler" type="button" @click="setMenuModalSidebar">
			<span class="fas fa-bars" />
		</button>
		<NuxtLink to="/" class="d-lg-none">
			<Logo />
		</NuxtLink>
		<Links class="ms-auto" />
	</nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal, useMenuModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import Links from '@app/components/layouts/topNavigations/Links.vue'
export default defineComponent({
	name: 'DashboardTopNavigation',
	components: { Links },
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { setCreateModalQuestion } = useCreateModal()
		const { setMenuModalSidebar } = useMenuModal()
		return {
			setMenuModalSidebar,
			openQuestionModal: () => {
				if (!isLoggedIn.value) redirect()
				else setCreateModalQuestion()
			}
		}
	}
})
</script>
