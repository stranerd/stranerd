<template>
	<AccountChallengesList />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AccountChallengesList from '@app/components/challenges/AccountChallengesList.vue'
export default defineComponent({
	name: 'AccountChallengesPage',
	components: { AccountChallengesList },
	layout: 'account'
})
</script>
