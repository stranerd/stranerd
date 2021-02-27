<template>
	<div>
		<div v-if="isLoggedIn" class="mt-3">
			<div class="d-flex flex-column align-items-center">
				<img :src="user.avatar" alt="" class="profile-image" style="width:90px;height:90px;">
				<NuxtLink to="/account" class="text-18 font-weight-bold">
					{{ user.firstName }}
				</NuxtLink>
				<span>Admin</span>
			</div>
			<div class="thick mx-n1" />
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
		color: $color-blue;
		padding: 0.75rem 1rem;
		margin: 0.25rem 0;
		display: flex;
		align-items: center;
		font-weight: 500;
		img {
			height: 24px;
			width: 24px;
		}
		span {
			font-size: 18px;
			margin-left: 0.75rem;
		}
	}
	.nuxt-link-exact-active {
		font-weight: 600;
		color: $color-light-blue;
		background: $color-blue;
		border-radius: 1rem;
		img { filter: brightness(250%); }
	}
}
</style>
