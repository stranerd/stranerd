<template>
	<div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<span class="text-18">{{ user.name }}</span>
			<span>Admin</span>
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/admin/questions">
				<img src="@/assets/images/icons/questions.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Questions</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/answers">
				<img src="@/assets/images/icons/answers.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Answers</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/friends">
				<img src="@/assets/images/icons/friends.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Friends</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/projects">
				<img src="@/assets/images/icons/projects.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Projects</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/e-wallet">
				<img src="@/assets/images/icons/e-wallet.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">E-Wallet</span>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AdminSidebar',
	setup () {
		const { isLoggedIn, user } = useAuth()
		return { isLoggedIn, user }
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
