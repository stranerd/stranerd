<template>
	<aside>
		<SidebarLogo class="d-none d-lg-block" />
		<div class="my-1 d-flex flex-column">
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
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SidebarLogo from '@app/components/layouts/sidebars/SidebarLogo.vue'
export default defineComponent({
	name: 'AdminSidebar',
	components: { SidebarLogo }
})
</script>

<style lang="scss" scoped>
aside {
	color: $color-light-blue;
}
.link {
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
	background: $color-light-blue;
	color: $color-blue;
	border-radius: 1rem;
	img { filter: brightness(80%); }
}
</style>
