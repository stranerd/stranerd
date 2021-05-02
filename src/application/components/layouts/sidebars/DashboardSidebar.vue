<template>
	<aside class="sidebar-body">
		<NuxtLink class="d-none d-lg-block text-center my-4" to="/">
			<Logo />
		</NuxtLink>
		<div class="my-1 sidebar-links">
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
export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const { isLoggedIn, isAdmin } = useAuth()
		return { isLoggedIn, isAdmin }
	}
})
</script>
