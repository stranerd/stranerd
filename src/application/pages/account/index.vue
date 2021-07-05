<template>
	<div>
		<UserProfileStats :user="user" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserProfileStats from '@app/components/users/user/UserProfileStats.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AccountIndexPage',
	components: { UserProfileStats },
	layout: 'account',
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
