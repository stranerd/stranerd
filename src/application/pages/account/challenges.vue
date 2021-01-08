<template>
	<UserChallengesList v-if="isLoggedIn" :user-id="id" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserChallengesList from '@app/components/challenges/UserChallengesList.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AccountChallengesPage',
	components: { UserChallengesList },
	layout: 'account',
	setup () {
		const { id, isLoggedIn } = useAuth()
		return { id, isLoggedIn }
	}
})
</script>
