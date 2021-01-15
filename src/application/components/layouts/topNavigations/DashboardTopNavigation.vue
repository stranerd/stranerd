<template>
	<section>
		<nav class="d-flex align-items-center">
			<button class="navbar-toggler rounded-0 mr-1 d-lg-none" type="button" @click="setMenuModalSidebar">
				<span class="fas fa-bars text-grey" />
			</button>
			<NuxtLink to="/" class="d-lg-none">
				<img src="@/assets/images/stranerd_logo.png" alt="Stranerd" height="50">
			</NuxtLink>
			<Links class="ml-auto" />
		</nav>
		<div class="d-md-none d-flex justify-content-center m-2">
			<a class="bg-accent text-white link-sm p-1" @click.prevent="openQuestionModal">
				<span class="fas fa-plus" style="font-size: 22px;" />
			</a>
			<NuxtLink class="link-sm" to="/">
				<img src="@/assets/images/icons/chat.svg" alt="">
			</NuxtLink>
			<NuxtLink class="link-sm" to="/">
				<img src="@/assets/images/icons/friends.svg" alt="">
			</NuxtLink>
		</div>
	</section>
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

<style lang="scss" scoped>
nav {
	background: $color-white;
	padding: 0.5rem 0.75rem;
	@media (min-width: $md) {
		margin: -1rem -1rem 0.5rem;
	}
	@media (min-width: $lg) {
		margin: 0 0 0.5rem;
		background: unset;
	}
}
.link-sm {
	color: $color-white;
	width: 36px;
	height: 36px;
	background: $color-grey;
	border-radius: 10rem;
	margin: 0 0.5rem;
	img {
		margin: 8px;
		width: 20px;
		height: 20px;
	}
}
</style>
