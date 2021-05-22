<template>
	<aside class="sidebar-body gap-1">
		<NuxtLink class="d-none d-lg-block text-center" to="/">
			<Logo />
		</NuxtLink>
		<ProfileHeadCard v-if="isLoggedIn" :user="user" />
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@app/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/questions">
				<img src="@app/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink v-if="isAdmin" class="sidebar-link" to="/admin/">
				<img src="@app/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'DefaultSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { isLoggedIn, user, isAdmin } = useAuth()
		return { isLoggedIn, user, isAdmin }
	}
})
</script>
