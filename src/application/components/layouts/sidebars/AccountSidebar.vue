<template>
	<div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<span class="text-18">{{ user.name }}</span>
			<div class="d-flex justify-content-around my-2 w-100">
				<div class="d-flex flex-column align-items-center">
					<span class="small">
						Credits
					</span>
					<span class="font-weight-bold">
						{{ user.account.credits }}
					</span>
				</div>
				<div class="d-flex flex-column align-items-center">
					<span class="small">
						Friends
					</span>
					<span class="font-weight-bold">
						0
					</span>
				</div>
				<div class="d-flex flex-column align-items-center">
					<span class="small">
						Questions
					</span>
					<span class="font-weight-bold">
						{{ user.meta.questionCount }}
					</span>
				</div>
				<div class="d-flex flex-column align-items-center">
					<span class="small">
						Answers
					</span>
					<span class="font-weight-bold">
						{{ user.meta.answerCount }}
					</span>
				</div>
			</div>
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/questions">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/answers">
				<img src="@/assets/images/icons/answers.svg" alt="">
				<span>Answers</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/challenges">
				<img src="@/assets/images/icons/challenge.svg" alt="">
				<span>Challenges</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/friends">
				<img src="@/assets/images/icons/friends.svg" alt="">
				<span>Friends</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/projects">
				<img src="@/assets/images/icons/projects.svg" alt="">
				<span>Projects</span>
			</NuxtLink>
			<NuxtLink class="link" to="/account/e-wallet">
				<img src="@/assets/images/icons/e-wallet.svg" alt="">
				<span>E-Wallet</span>
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
export default defineComponent({
	name: 'AccountSidebar',
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
		color: $color-white;
		background: $color-red;
		margin: 0 -0.5rem;
		padding: 0.75rem 1.5rem;
		@media (min-width: $md) {
			display: none;
		}
	}
}
</style>
