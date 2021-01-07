<template>
	<div>
		<div class="text-center">
			<img src="@/assets/images/stranerd_logo.png" height="50" alt="Stranerd">
		</div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<span class="text-18">{{ user.name }}</span>
			<span class="mb-1">
				<span>{{ user.account.credits }}</span>
				<Credits :size="16" />
			</span>
			<NuxtLink to="/account/" class="btn btn-outline-accent rounded-pill px-3 py-1">
				View Profile
			</NuxtLink>
		</div>
		<div class="d-flex justify-content-center mt-2 mb-3 text-light-grey">
			<i class="fas fa-circle mx-1" />
			<i class="fas fa-circle mx-1" />
			<i class="fas fa-circle mx-1" />
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/tutors">
				<img src="@/assets/images/icons/tutors.svg" alt="">
				<span>Tutors</span>
			</NuxtLink>
			<NuxtLink class="link" to="/flashcards">
				<img src="@/assets/images/icons/flashcards.svg" alt="">
				<span>Flashcards</span>
			</NuxtLink>
			<NuxtLink class="link" to="/test-preps">
				<img src="@/assets/images/icons/testprep.svg" alt="">
				<span>Test Preps</span>
			</NuxtLink>
			<NuxtLink class="link" to="/shop">
				<img src="@/assets/images/icons/shop.svg" alt="">
				<span>Shop</span>
			</NuxtLink>
			<NuxtLink v-if="isAdmin" class="link" to="/admin/">
				<img src="@/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
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
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const { isLoggedIn, user, isAdmin } = useAuth()
		const { loading, signout } = useSessionSignout()
		return { isLoggedIn, user, isAdmin, loading, signout }
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
