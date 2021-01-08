<template>
	<AccountChallengesList v-if="isLoggedIn" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AccountChallengesList from '@app/components/challenges/AccountChallengesList.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AccountChallengesPage',
	components: { AccountChallengesList },
	layout: 'account',
	setup () {
		const { isLoggedIn } = useAuth()
		return { isLoggedIn }
	}
})
</script>
