<template>
	<aside class="sidebar-body gap-1">
		<div class="sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@app/assets/images/icons/dashboard.svg" alt="">
				<span>Home</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/questions/subjects">
				<img src="@app/assets/images/icons/subjects.svg" alt="">
				<span>Subjects</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/users/admins">
				<img src="@app/assets/images/icons/users.svg" alt="">
				<span>Admins</span>
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
