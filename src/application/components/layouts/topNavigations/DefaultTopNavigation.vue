<template>
	<nav class="default-top-nav gap-1" role="navigation">
		<template v-if="showSearch">
			<span @click="showSearch = false">
				<img class="head-icons" src="@app/assets/images/icons/close.svg" alt="">
			</span>
			<SearchBar class="flex-grow-1" />
		</template>
		<template v-else>
			<span class="d-lg-none" @click="openLeftMenu">
				<img class="head-icons" src="@app/assets/images/icons/hamburger.svg" alt="">
			</span>

			<NuxtLink to="/">
				<Logo :secondary="true" />
			</NuxtLink>

			<SearchBar class="middle-body mx-auto d-none d-lg-flex" />

			<div class="right-body gap-1-5 gap-md-2-25 gap-lg-3 gap-xl-4-5 ms-auto">
				<span class="d-lg-none" @click="showSearch = !showSearch">
					<img class="head-icons" src="@app/assets/images/icons/search.svg">
				</span>
				<MessageLink :key="'messages' + isLoggedIn" />
				<NotificationBell :key="'notifications' + isLoggedIn" />

				<span class="d-lg-none" @click="openRightMenu">
					<img class="head-icons" src="@app/assets/images/icons/right-nav.svg" alt="">
				</span>

				<div v-if="isLoggedIn" class="d-none d-lg-flex gap-0-25 gap-lg-1 align-items-center cursor-pointer" @click="show = !show">
					<Avatar :src="user.avatar" :size="48" />
					<span class="d-flex gap-0-5 align-items-center">
						<DynamicText class="username" :truncate="true">
							{{ user.fullName }}
						</DynamicText>
						<i class="fas" :class="show ? 'fa-angle-up' : 'fa-angle-down'" />
					</span>
				</div>

				<transition name="slide" appear>
					<div v-if="show" class="menu-bg">
						<div class="under" @click="show = false" />
						<div class="drop-menu gap-1-5">
							<NuxtLink to="/account/">
								<img src="@app/assets/images/icons/user.svg" alt="">
								Profile
							</NuxtLink>
							<NuxtLink v-if="isAdmin" to="/admin/">
								<img src="@app/assets/images/icons/admin.svg" alt="">
								Admin
							</NuxtLink>
							<span @click="signout">
								<img src="@app/assets/images/icons/signout.svg" alt="">
								Log Out
							</span>
							<PageLoading v-if="loading" />
						</div>
					</div>
				</transition>
			</div>
		</template>
	</nav>
</template>

<script lang="ts">
import SearchBar from '@app/components/search/SearchBar.vue'
import NotificationBell from '@app/components/layouts/topNavigations/NotificationBell.vue'
import MessageLink from '@app/components/layouts/topNavigations/MessageLink.vue'
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'DefaultTopNavigation',
	components: { SearchBar, NotificationBell, MessageLink },
	props: {
		openLeftMenu: {
			type: Function as PropType<() => {}>,
			required: false,
			default: useMenuModal().openSidebar
		},
		openRightMenu: {
			type: Function as PropType<() => {}>,
			required: false,
			default: useMenuModal().openRightSidebar
		}
	},
	setup () {
		const { isLoggedIn, isAdmin, user } = useAuth()
		const show = ref(false)
		const showSearch = ref(false)
		const { loading, error, signout } = useSessionSignout()
		return { show, isLoggedIn, isAdmin, user, loading, error, signout, showSearch }
	}
})
</script>

<style lang="scss" scoped>
	.menu-bg {
		position: fixed;
		width: 100vw;
		height: vh(100);
		left: 0;
		top: 0;
		z-index: 2;

		.under {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}

	.default-top-nav {
		display: flex;
		align-items: center;
		color: $color-dark;
		padding: 0.75rem 1rem;
		border-bottom: 5px solid $color-primary;
		@media (min-width: $md) { padding: 1rem 2rem; }
		@media (min-width: $lg) { padding: 1rem 3rem; }
		@media (min-width: $xl) { padding: 1rem 4.5rem; }

		background: $color-white 0 0 no-repeat padding-box;
	}

	.middle-body {
		flex-grow: 1;
		max-width: 51.25%;
	}

	.right-body {
		display: flex;
		align-items: center;

		.drop-menu {
			position: absolute;
			top: 96px;
			right: 24px;
			display: flex;
			flex-direction: column;
			width: auto;
			min-width: 200px;
			padding: 1.5rem;
			background: $color-white 0% 0% no-repeat padding-box;
			box-shadow: 0 10px 10px rgba($color-primary, 0.1);
			border-radius: 6px;

			& > * {
				display: flex;
				color: $color-dark;
				font-weight: 600;

				img {
					margin-right: 18px;
					width: 24px;
				}
			}
		}
	}

	.username {
		font-size: 18px;
		font-weight: 600;
	}

	.slide-enter-active, .slide-leave-active { transition: 0.25s; }

	.slide-enter, .slide-leave-to { transform: translateY(-170px); }
</style>
