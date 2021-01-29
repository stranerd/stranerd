<template>
	<div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<NuxtLink to="/account" class="text-18 font-weight-bold">
				{{ user.firstName }}
			</NuxtLink>
			<span>Admin</span>
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/questions/subjects">
				<img src="@/assets/images/icons/subjects.svg" alt="">
				<span>Subjects</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/users/admins">
				<img src="@/assets/images/icons/users.svg" alt="">
				<span>Admins</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/users/tutors">
				<img src="@/assets/images/icons/users.svg" alt="">
				<span>Tutors</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/blog/articles">
				<img src="@/assets/images/icons/articles.svg" alt="">
				<span>Articles</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/shop/notes">
				<img src="@/assets/images/icons/answers.svg" alt="">
				<span>Shop Notes</span>
			</NuxtLink>
			<NuxtLink class="link" to="/admin/challenges">
				<img src="@/assets/images/icons/challenge.svg" alt="">
				<span>Challenges</span>
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
	name: 'AdminSidebar',
	setup () {
		const { isLoggedIn, user } = useAuth()
		const { loading, signout } = useSessionSignout()
		return { isLoggedIn, user, loading, signout }
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
		color: $color-white;
		background: lighten($color-blue, 10);
		margin: 0 -0.5rem;
		padding: 0.75rem 1.5rem;
		img { filter: brightness(100%); }
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
