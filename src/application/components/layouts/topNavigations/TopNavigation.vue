<template>
	<nav class="gap-0-75" :class="full ? 'full-top-nav' : 'top-nav'">
		<button class="navbar-toggler" type="button" @click="openMenu">
			<span class="fas fa-bars" />
		</button>
		<NuxtLink v-if="!showSearch" to="/" :class="{ 'd-lg-none': !full }">
			<Logo />
		</NuxtLink>
		<div class="links ms-auto d-flex">
			<template v-if="showSearch">
				<a class="me-0-5" @click.prevent="showSearch = false">
					<i class="fas fa-times" />
				</a>
				<SearchBar />
			</template>
			<template v-else>
				<a class="link d-md-none">
					<img class="filter" src="@app/assets/images/icons/search.svg" alt="" @click="showSearch = true">
				</a>
				<div class="link d-none d-md-inline-flex flex-grow-1 align-items-center border-0">
					<SearchBar />
				</div>
				<NotificationBell :key="isLoggedIn" class="link" />
				<a v-if="isLoggedIn" class="link" @click="setMenuModalRightSidebar">
					<Avatar :src="user.avatar" :size="32" />
				</a>
			</template>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SearchBar from '@app/components/search/SearchBar.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
import NotificationBell from '@app/components/layouts/topNavigations/NotificationBell.vue'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'TopNavigation',
	components: { SearchBar, NotificationBell },
	props: {
		full: {
			type: Boolean,
			default: false
		},
		openMenu: {
			required: true,
			type: Function
		}
	},
	setup () {
		const showSearch = ref(false)
		const { isLoggedIn, user } = useAuth()
		const { setMenuModalRightSidebar } = useMenuModal()
		const { loading, signout } = useSessionSignout()
		return { showSearch, isLoggedIn, user, setMenuModalRightSidebar, loading, signout }
	}
})
</script>

<style lang="scss" scoped>
.links {
	@media (min-width: $lg) {
		padding: 1rem 0;
		width: 100%;
	}
	.link {
		display: flex;
		align-items: center;
		padding: 0 0.75rem;
		& > img, /deep/ > img {
			width: 24px;
			height: 24px;
		}
		@media (min-width: $sm) {
			padding: 0 1rem;
		}
		@media (min-width: $lg) {
			padding: 0 2rem;
			border-left: 1px solid $color-blue;
		}
	}
}
</style>
