<template>
	<div class="text-grey">
		<template v-if="current">
			<div class="m-1">
				<h5 class="font-weight-bold">
					Current Challenge
				</h5>
				<hr class="thin">
				<CurrentChallengeCard :challenge="current" />
			</div>
			<div class="my-2 bg-light-grey" style="height: 8px;" />
		</template>
		<div class="m-1">
			<h5 class="font-weight-bold">
				New Challenges
			</h5>
			<hr class="thin">
			<div v-for="challenge in challenges" :key="challenge.hash">
				<StartChallengeCard :challenge="challenge" :personal-challenges="pChallenges" class="my-2" />
				<hr class="thin">
			</div>
		</div>
		<DisplayWarning v-if="!loading && !error && !current && challenges.length === 0" message="No new challenges found" />
		<div v-else class="text-center m-2 text-18">
			<NuxtLink to="/account/challenges" class="font-weight-bold">
				SEE MORE
			</NuxtLink>
		</div>
		<PageLoading v-if="loading" />
		<PageLoading v-if="pLoading" />
		<div class="mx-1">
			<DisplayError :error="error" />
			<DisplayError :error="pError" />
		</div>
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
