<template>
	<div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<NuxtLink to="/account" class="text-18">
				{{ user.name }}
			</NuxtLink>
			<span>Admin</span>
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/admin/questions/subjects">
				<img src="@/assets/images/icons/subjects.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Subjects</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/users/admins">
				<img src="@/assets/images/icons/users.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Admins</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/users/tutors">
				<img src="@/assets/images/icons/users.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Tutors</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/blog/articles">
				<img src="@/assets/images/icons/articles.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Articles</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/shop/notes">
				<img src="@/assets/images/icons/answers.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Shop Notes</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/challenges">
				<img src="@/assets/images/icons/challenge.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Challenges</span>
			</NuxtLink>
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Main Site</span>
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
