<template>
	<aside class="sidebar-body">
		<Logo class="d-none d-lg-block my-4" />
		<div class="my-1 sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/questions/subjects">
				<img src="@/assets/images/icons/subjects.svg" alt="">
				<span>Subjects</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/users/admins">
				<img src="@/assets/images/icons/users.svg" alt="">
				<span>Admins</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/admin/users/tutors">
				<img src="@/assets/images/icons/users.svg" alt="">
				<span>Tutors</span>
			</NuxtLink>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'AdminSidebar'
})
</script>
