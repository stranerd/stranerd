<template>
	<nav class="question-top-nav">
		<button class="navbar-toggler d-inline" type="button" @click="setMenuModalSidebar">
			<span class="fas fa-bars" />
		</button>
		<NuxtLink to="/">
			<Logo />
		</NuxtLink>
		<Links class="ml-auto" />
	</nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal, useMenuModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import Links from '@app/components/layouts/topNavigations/Links.vue'
export default defineComponent({
	name: 'QuestionTopNavigation',
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
