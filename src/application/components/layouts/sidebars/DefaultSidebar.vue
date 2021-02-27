<template>
	<aside class="sidebar-body">
		<div v-if="isLoggedIn" class="mt-3">
			<ProfileHeadCard :user="user" />
			<div class="thick mx-n1" />
		</div>
		<div class="my-2 sidebar-links">
			<NuxtLink class="sidebar-link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="sidebar-link" to="/questions">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink v-if="isAdmin" class="sidebar-link" to="/admin/">
				<img src="@/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@app/hooks/core/numbers'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'DefaultSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { isLoggedIn, user, isAdmin } = useAuth()
		return { isLoggedIn, user, isAdmin, formatNumber }
	}
})
</script>
