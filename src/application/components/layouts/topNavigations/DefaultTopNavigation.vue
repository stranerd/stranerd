<template>
	<nav class="default-top-nav gap-1-5 gap-lg-3" role="navigation">
		<NuxtLink to="/dashboard">
			<Logo :secondary="true" class="nav-logo" />
		</NuxtLink>

		<SearchBar class="middle-body" />
		<div class="right-body gap-1-5 gap-lg-3">
			<MessageLink :key="'messages' + isLoggedIn" class="link" />
			<NotificationBell :key="'notifications' + isLoggedIn" class="link" />

			<div v-if="isLoggedIn" class="d-flex gap-0-25 gap-lg-1 align-items-center cursor-pointer" @click="show = !show">
				<Avatar :src="user.avatar" :size="48" />
				<span class="d-flex gap-0-5 align-items-center">
					<span class="username text-truncate">{{ user.fullName }}</span>
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
						<span @click="signout">
							<img src="@app/assets/images/icons/signout.svg" alt="">
							Log Out
						</span>
						<PageLoading v-if="loading" />
					</div>
				</div>
			</transition>
		</div>
	</nav>
</template>

<script lang="ts">
import SearchBar from '@app/components/search/SearchBar.vue'
import NotificationBell from '@app/components/layouts/topNavigations/NotificationBell.vue'
import MessageLink from '@app/components/layouts/topNavigations/MessageLink.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DefaultTopNavigation',
	components: { SearchBar, NotificationBell, MessageLink },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const show = ref(false)
		const { loading, error, signout } = useSessionSignout()
		return { show, isLoggedIn, user, loading, error, signout }
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

	.nav-logo {
		&:hover {
			transition: all 0.3s;
			transform: scale(1.2);
		}
	}

	.default-top-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $color-dark;
		min-height: 60px;
		padding: 1rem;
		border-bottom: 5px solid $color-primary;
		@media (min-width: $md) { padding: 1rem 2rem; }
		@media (min-width: $lg) { padding: 1rem 4rem; }

		background: $color-white 0 0 no-repeat padding-box;
	}

	.middle-body {
		flex-grow: 1;
		max-width: 50%;
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

			span {
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
		color: $color-dark !important;
	}

	.slide-enter-active, .slide-leave-active { transition: 0.5s; }

	.slide-enter, .slide-leave-to { transform: translateY(-170px); }
</style>
