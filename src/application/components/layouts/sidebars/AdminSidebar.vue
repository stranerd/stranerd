<template>
	<aside class="sidebar-body">
		<NuxtLink class="d-none d-lg-block text-center my-2" to="/">
			<Logo />
		</NuxtLink>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-1">
			<Avatar :src="user.avatar" :size="90" />
			<span class="text-18 fw-bold">{{ user.fullName }}</span>
			<span>Admin</span>
		</div>
		<div class="my-0-5 sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@app/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/questions/subjects">
				<img src="@app/assets/images/icons/subjects.svg" alt="">
				<span>Subjects</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/users/admins">
				<img src="@app/assets/images/icons/users.svg" alt="">
				<span>Admins</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/users/nerds">
				<img src="@app/assets/images/icons/users.svg" alt="">
				<span>Nerds</span>
			</NuxtLink>
		</div>
	</aside>
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
