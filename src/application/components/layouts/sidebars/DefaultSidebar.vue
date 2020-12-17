<template>
	<div>
		<div class="text-center my-1 d-none d-lg-block">
			<img src="@/assets/images/stranerd_logo.png" height="50" alt="Stranerd">
		</div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<span class="text-18">{{ user.name }}</span>
			<span>
				<span>{{ user.account.credits }}</span>
				<img src="@/assets/images/icons/credits.svg" width="16" height="16" alt="">
			</span>
			<NuxtLink to="/account/" class="btn my-2 btn-outline-accent rounded-pill px-3 py-1">
				View Profile
			</NuxtLink>
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/tutors">
				<img src="@/assets/images/icons/tutors.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Tutors</span>
			</NuxtLink>
			<NuxtLink class="link" to="/flashcards">
				<img src="@/assets/images/icons/flashcards.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Flashcards</span>
			</NuxtLink>
			<NuxtLink class="link" to="/test-preps">
				<img src="@/assets/images/icons/testprep.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Test Preps</span>
			</NuxtLink>
			<NuxtLink class="link" to="/shop">
				<img src="@/assets/images/icons/shop.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Shop</span>
			</NuxtLink>
			<NuxtLink v-if="isAdmin" class="link" to="/admin/">
				<img src="@/assets/images/icons/admin.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Admin Site</span>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const { isLoggedIn, user, isAdmin } = useAuth()
		return { isLoggedIn, user, isAdmin }
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
	}
	.nuxt-link-exact-active {
		font-weight: 600;
		color: $color-grey;
		background: lighten($color-accent, 10);
		margin: 0 -0.5rem;
		padding: 0.75rem 1.5rem;
		img { filter: brightness(50%); }
	}
}
</style>
