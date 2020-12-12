<template>
	<div>
		<div class="text-center my-1 d-none d-lg-block">
			<img src="@/assets/images/stranerd_logo.png" height="50" alt="Stranerd">
		</div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<span class="text-18">{{ user.name }}</span>
		</div>
		<div class="my-1 d-flex flex-column links">
			<BaseLink class="link" to="/account/questions" :root="true">
				<img src="@/assets/images/icons/dashboard.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Questions</span>
			</BaseLink>
			<BaseLink class="link" to="/account/answers" :root="true">
				<img src="@/assets/images/icons/tutors.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Answers</span>
			</BaseLink>
			<BaseLink class="link" to="/account/friends" :root="true">
				<img src="@/assets/images/icons/flashcards.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Friends</span>
			</BaseLink>
			<BaseLink class="link" to="/account/projects" :root="true">
				<img src="@/assets/images/icons/testprep.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Projects</span>
			</BaseLink>
			<BaseLink class="link" to="/account/e-wallet" :root="true">
				<img src="@/assets/images/icons/shop.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">E-Wallet</span>
			</BaseLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AccountSidebar',
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
	}
}
</style>
