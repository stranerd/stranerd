<template>
	<section>
		<DefaultTopNavigation :hide-logo="true" class="top-nav" />
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
			<a v-if="isLoggedIn" class="link-sm" @click.prevent="signout">
				<PageLoading v-if="loading" />
				<img src="@/assets/images/icons/signout.svg" alt="">
			</a>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import DefaultTopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth, useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DashboardTopNavigation',
	components: {
		DefaultTopNavigation
	},
	setup () {
		const { isLoggedIn } = useAuth()
		const { loading, signout } = useSessionSignout()
		const { redirect } = useRedirectToAuth()
		const { setCreateModalQuestion } = useCreateModal()
		return {
			isLoggedIn, loading, signout,
			openQuestionModal: () => {
				if (!isLoggedIn.value) redirect()
				else setCreateModalQuestion()
			}
		}
	}
})
</script>

<style lang="scss" scoped>
.top-nav {
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
