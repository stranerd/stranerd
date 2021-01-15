<template>
	<div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/questions`">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/answers`">
				<img src="@/assets/images/icons/answers.svg" alt="">
				<span>Answers</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/challenges`">
				<img src="@/assets/images/icons/challenge.svg" alt="">
				<span>Challenges</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/friends`">
				<img src="@/assets/images/icons/friends.svg" alt="">
				<span>Friends</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/projects`">
				<img src="@/assets/images/icons/projects.svg" alt="">
				<span>Projects</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/e-wallet`">
				<img src="@/assets/images/icons/e-wallet.svg" alt="">
				<span>E-Wallet</span>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'UserSidebar',
	setup () {
		const { route } = useContext()
		const { userId } = route.value.params
		return { userId }
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
