<template>
	<div>
		<ChallengeCard v-for="challenge in challenges" :key="challenge.hash" :challenge="challenge" class="my-2" />
		<DisplayWarning v-if="!loading && !error && challenges.length === 0" message="No challenges found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useChallengeList } from '@app/hooks/challenges/challenges'
import ChallengeCard from '@app/components/admin/challenges/AdminChallengesListCard.vue'
export default defineComponent({
	name: 'AdminChallengesList',
	components: { ChallengeCard },
	layout: 'admin',
	setup () {
		const { loading, error, challenges } = useChallengeList()
		return { loading, error, challenges }
	}
})
</script>
