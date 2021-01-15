<template>
	<div class="text-grey">
		<div v-if="current" class="mb-4">
			<h6>Current Challenge</h6>
			<CurrentChallengeCard :challenge="current" />
			<hr class="thin">
		</div>
		<div class="my-2">
			<h6>New Challenges</h6>
			<hr class="thin">
			<div v-for="challenge in challenges" :key="challenge.hash">
				<StartChallengeCard :challenge="challenge" :personal-challenges="pChallenges" class="my-2" />
				<hr class="thin">
			</div>
		</div>
		<DisplayWarning v-if="!loading && !error && !current && challenges.length === 0" message="No new challenges found" />
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
import { computed, defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useChallengeList } from '@app/hooks/challenges/challenges'
import StartChallengeCard from '@app/components/challenges/StartChallengeCard.vue'
import CurrentChallengeCard from '@app/components/challenges/CurrentChallengeCard.vue'
import { usePersonalChallengesList } from '@app/hooks/challenges/personal-challenges'
export default defineComponent({
	name: 'ChallengesList',
	components: {
		StartChallengeCard,
		CurrentChallengeCard
	},
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { loading, error, challenges: nChallenges } = useChallengeList()
		const { loading: pLoading, error: pError, challenges: pChallenges, listener, current } = usePersonalChallengesList(props.userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const challenges = computed({
			get: () => nChallenges.value.filter((c) => {
				const p = pChallenges.value.find((p) => p.clone.id === c.id)
				if (!p) return true
				if (p.id === current.value?.id) return false
				return p.cancelled || !p.isCompleted
			}).slice(0, 3),
			set: () => {}
		})
		return {
			loading, error, challenges,
			current, pChallenges,
			pLoading, pError
		}
	}
})
</script>
