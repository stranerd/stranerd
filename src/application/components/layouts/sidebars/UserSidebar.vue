<template>
	<div>
		<div v-if="user" class="d-none d-lg-block">
			<UserHeadCard :user="user" />
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/questions`">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span><span class="d-lg-none">User's </span>Questions</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/answers`">
				<img src="@/assets/images/icons/answers.svg" alt="">
				<span><span class="d-lg-none">User's </span>Answers</span>
			</NuxtLink>
			<NuxtLink v-if="user && user.roles.isTutor" class="link" :to="`/users/${userId}/sessions`">
				<img src="@/assets/images/icons/chat.svg" alt="">
				<span><span class="d-lg-none">User's </span>Sessions</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/about`">
				<img src="@/assets/images/icons/about.svg" alt="">
				<span><span class="d-lg-none">User's </span>About</span>
			</NuxtLink>
			<NuxtLink class="link" :to="`/users/${userId}/projects`">
				<img src="@/assets/images/icons/projects.svg" alt="">
				<span><span class="d-lg-none">User's </span>Projects</span>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import UserHeadCard from '@app/components/users/user/UserHeadCard.vue'
export default defineComponent({
	name: 'UserSidebar',
	components: { UserHeadCard },
	setup () {
		const { route } = useContext()
		const { userId } = route.value.params
		const { error, loading, user } = useUser(userId)
		return { userId, error, loading, user }
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
