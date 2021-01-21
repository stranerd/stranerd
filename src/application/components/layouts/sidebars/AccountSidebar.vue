<template>
	<div>
		<div v-if="isLoggedIn" class="d-none d-lg-block">
			<AccountHeadCard :user="user" />
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/questions">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span><span class="d-lg-none">My </span>Questions</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/answers">
				<img src="@/assets/images/icons/answers.svg" alt="">
				<span><span class="d-lg-none">My </span>Answers</span>
			</NuxtLink>
			<NuxtLink v-if="user.roles.isTutor" class="link" to="/account/sessions">
				<img src="@/assets/images/icons/chat.svg" alt="">
				<span><span class="d-lg-none">My </span>Sessions</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/challenges">
				<img src="@/assets/images/icons/challenge.svg" alt="">
				<span><span class="d-lg-none">My </span>Challenges</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/friends">
				<img src="@/assets/images/icons/friends.svg" alt="">
				<span><span class="d-lg-none">My </span>Friends</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/projects">
				<img src="@/assets/images/icons/projects.svg" alt="">
				<span><span class="d-lg-none">My </span>Projects</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/e-wallet">
				<img src="@/assets/images/icons/e-wallet.svg" alt="">
				<span><span class="d-lg-none">My </span>E-Wallet</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/about">
				<img src="@/assets/images/icons/about.svg" alt="">
				<span><span class="d-lg-none">My </span>About</span>
			</NuxtLink>
			<a class="link" @click.prevent="openEditProfileModal">
				<img src="@/assets/images/icons/edit-profile.svg" alt="">
				<span>Edit Profile</span>
			</a>
			<a v-if="isLoggedIn" class="link logout" @click="signout">
				<PageLoading v-if="loading" />
				<img src="@/assets/images/icons/signout.svg" alt="">
				<span>Signout</span>
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useEditModal, useMenuModal } from '@app/hooks/core/modals'
import { useSessionSignout } from '@app/hooks/auth/session'
import AccountHeadCard from '@app/components/users/account/AccountHeadCard.vue'
export default defineComponent({
	name: 'AccountSidebar',
	components: { AccountHeadCard },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const { loading, signout } = useSessionSignout()
		const openEditProfileModal = () => {
			useMenuModal().closeMenuModal()
			useEditModal().setEditModalAccountProfile()
		}
		return { isLoggedIn, user, openEditProfileModal, loading, signout }
	}
})
</script>

<style lang="scss" scoped>
.links {
	.link {
		color: darken($color-light-grey, 10);
		padding: 0.75rem 1rem;
		display: flex;
		align-items: center;
		font-weight: 500;
		img {
			height: 24px;
			width: 24px;
		}
		span {
			font-size: 18px;
			margin-left: 0.5rem;
		}
	}
	.nuxt-link-exact-active {
		font-weight: 600;
		color: $color-grey;
		background: lighten($color-accent, 10);
		margin: 0 -0.5rem;
		padding: 0.75rem 1.5rem;
		img { filter: brightness(50%); }
	}
	.logout {
		color: $color-white !important;
		background: $color-red;
		margin: 0 -0.5rem;
		padding: 0.75rem 1.5rem;
		@media (min-width: $md) {
			display: none;
		}
	}
}
</style>
