<template>
	<div>
		<UserProfileStats :user="user" />
		<UserAchievementsList class="page-content my-1" :user="user" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserProfileStats from '@app/components/users/user/UserProfileStats.vue'
import { useAuth } from '@app/hooks/auth/auth'
import UserAchievementsList from '@app/components/users/achievements/UserAchievementsList.vue'
export default defineComponent({
	name: 'AccountIndexPage',
	components: { UserProfileStats, UserAchievementsList },
	layout: 'account',
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
