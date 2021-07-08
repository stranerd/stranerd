<template>
	<nav class="home-top-nav gap-1" role="navigation">
		<Logo :secondary="true" class="nav-logo" />
		<SearchBar class="middle-body" />
		<div class="right-body gap-0-75 gap-lg-1-5">
			<MessageLink :key="'messages' + isLoggedIn" class="link" />
			<NotificationBell :key="'notifications' + isLoggedIn" class="link" />

			<div v-if="isLoggedIn" class="d-flex gap-0-25 gap-lg-0-5 align-items-center cursor-pointer" @click="show = !show">
				<Avatar :src="user.avatar" :size="48" />
				<span class="d-flex gap-0-25 align-items-center">
					<span class="username text-truncate">{{ user.fullName }}</span>
					<img src="@app/assets/images/icons/down-arrow.svg" alt="">
				</span>
			</div>
			<transition name="slide" appear>
				<div v-if="show">
					<div class="under" @click="show = false" />
					<div class="drop-menu">
						<span><img src="@app/assets/images/icons/user.svg" alt="">Profile</span>
						<span><img src="@app/assets/images/icons/signout.svg" alt="">Log Out</span>
					</div>
				</div>
			</transition>
		</div>
	</nav>
</template>

<script lang="ts">
import SearchBar from '@app/components/search/SearchBar.vue'
import NotificationBell from '@app/components/layouts/topNavigations/NotificationBell.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import MessageLink from './MessageLink.vue'
export default defineComponent({
	name: 'DefaultTopNavigation',
	components: { SearchBar, NotificationBell, MessageLink },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const show = ref(false)
		return { show, isLoggedIn, user }
	}
})
</script>

<style lang="scss" scoped>
	.under {
		position: fixed;
		width: 100vw;
		height: vh(100);
		left: 0;
		top: 0;
	}

	.nav-logo {
		&:hover {
			transition: all 0.3s;
			transform: scale(1.2);
		}
	}

	.home-top-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $color-text-main;
		min-height: 60px;
		padding: 1rem;

		@media (min-width: $md) { padding: 1rem 2rem; }

		@media (min-width: $lg) { padding: 1rem 5rem; }

		background: #fff 0 0 no-repeat padding-box;
		box-shadow: 0 5px 15px #17224d26;

		button.navbar-toggler {
			border: none;
			outline: none;
			border-radius: 0;
			color: $color-tint-blue;
		}
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
			justify-content: center;
			align-items: center;
			width: 172px;
			background: $color-white 0% 0% no-repeat padding-box;
			box-shadow: 0 10px 10px #374b9926;
			border-radius: 6px;
			z-index: 2;

			span {
				width: 150px;
				padding: 10px;
				display: flex;
				justify-content: center;
				color: $color-text-sub;

				img {
					margin-right: 18px;
					width: 24px;
				}
			}
		}
	}

	.link {
		display: flex;
		align-items: center;

		& > img,
		& >>> img,
		& >>> span > img {
			width: 24px;
			height: 24px;
		}
	}

	.username {
		font-size: 18px;
		font-weight: 600px;
		color: $color-text-main !important;
	}

	.slide-enter-active,
	.slide-leave-active { transition: 0.5s; }

	.slide-enter,
	.slide-leave-to {
		transform: translateY(-100px);
		opacity: 0;
	}
</style>
