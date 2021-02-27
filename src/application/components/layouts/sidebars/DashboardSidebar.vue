<template>
	<aside>
		<SidebarLogo class="d-none d-lg-block" />
		<div class="my-1 d-flex flex-column">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/questions">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink v-if="isAdmin" class="link" to="/admin/">
				<img src="@/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import SidebarLogo from '@app/components/layouts/sidebars/SidebarLogo.vue'
export default defineComponent({
	name: 'DefaultSidebar',
	components: { SidebarLogo },
	setup () {
		const { isLoggedIn, isAdmin } = useAuth()
		return { isLoggedIn, isAdmin }
	}
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
