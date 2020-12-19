<template>
	<div class="text-grey">
		<div v-for="challenge in challenges" :key="challenge.hash">
			<ChallengeCard :challenge="challenge" :personal-challenges="pChallenges" class="my-2" />
			<hr class="thin">
		</div>
		<DisplayWarning v-if="!loading && !error && challenges.length === 0" message="No challenges found" />
		<div v-else class="text-center py-1 text-18">
			<NuxtLink to="/account/challenges" class="font-weight-bold text-grey">
				SEE MORE
			</NuxtLink>
		</div>
		<PageLoading v-if="loading" />
		<PageLoading v-if="pLoading" />
		<DisplayError :error="error" />
		<DisplayError :error="pError" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useChallengeList } from '@app/hooks/challenges/challenges'
import ChallengeCard from '@app/components/challenges/ChallengesListCard.vue'
import { usePersonalChallengesList } from '@app/hooks/challenges/personal-challenges'
export default defineComponent({
	name: 'ChallengesList',
	components: { ChallengeCard },
	setup () {
		const { loading, error, challenges } = useChallengeList()
		const { loading: pLoading, error: pError, challenges: pChallenges, listener } = usePersonalChallengesList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			loading, error, challenges,
			pLoading, pError, pChallenges
		}
	}
})
</script>
