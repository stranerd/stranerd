<template>
	<div>
		<UserProfileStats :user="user" />
		<ProfileAchievementsList class="page-content my-1" :user="user" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserProfileStats from '@app/components/users/user/UserProfileStats.vue'
import { useAuth } from '@app/hooks/auth/auth'
import ProfileAchievementsList from '@app/components/users/achievements/ProfileAchievementsList.vue'
export default defineComponent({
	name: 'AccountIndexPage',
	components: { UserProfileStats, ProfileAchievementsList },
	layout: 'account',
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
